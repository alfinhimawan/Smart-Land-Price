import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PredictionResult } from '@/types';
import { idwFormulaBase64 } from '@/utils/idwFormulaBase64';

export const generatePdfReport = (result: PredictionResult) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Helper for formatting currency
  const formatIDR = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Helper for formatting distance
  const formatDistance = (distKm: number) => {
    if (distKm < 1) {
      return `${Math.round(distKm * 1000)} m`;
    }
    return `${distKm.toFixed(2)} km`;
  };

  // Set general font
  doc.setFont('helvetica');

  // --- HEADER ---
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Laporan Hasil Prediksi Harga Lahan Koridor Tol IKN', 105, 20, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const printDate = new Date().toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' });
  doc.text(`Tanggal Cetak: ${printDate}`, 14, 30);
  doc.text(`Koordinat Target: ${result.coordinates.lat.toFixed(6)}, ${result.coordinates.lng.toFixed(6)}`, 14, 36);
  doc.text(`Radius Analisis: ${result.radiusUsed} km`, 14, 42);

  // --- LANDASAN TEORI ---
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Landasan Teori', 14, 52);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const theoryText = `Prediksi harga lahan ini menggunakan metode Interpolasi Inverse Distance Weighted (IDW) dengan parameter power (p) = ${result.powerUsed}. Metode ini bekerja berdasarkan prinsip pembobotan jarak, di mana titik sampel yang lebih dekat memberikan kontribusi lebih besar terhadap estimasi nilai di titik target dibandingkan titik yang jauh.\n\nPersamaan Matematis IDW:`;
  const splitTheory = doc.splitTextToSize(theoryText, 182);
  doc.text(splitTheory, 14, 58);

  const afterTheoryY = 58 + (splitTheory.length * 5);

  // Render Rumus via Base64 Image (Presisi Anti-Stretch)
  const imgProps = doc.getImageProperties(idwFormulaBase64);
  const formulaWidth = 100; // Lebar proporsional di A4
  const formulaHeight = (imgProps.height * formulaWidth) / imgProps.width;
  const formulaX = (210 - formulaWidth) / 2; // Center horizontally
  
  doc.addImage(idwFormulaBase64, 'PNG', formulaX, afterTheoryY + 2, formulaWidth, formulaHeight);
  
  // Bullet points komponen rumus (Super Presisi Manual Alignment)
  const bulletY = afterTheoryY + formulaHeight + 8;
  doc.setFontSize(10);
  
  // Bullet 1: Z(x)
  doc.setFont('helvetica', 'normal'); doc.text('\u2022', 18, bulletY);
  doc.setFont('helvetica', 'italic'); doc.text('Z(x)', 23, bulletY); 
  doc.setFont('helvetica', 'normal'); doc.text(':', 32, bulletY);
  doc.text('Estimasi harga di lokasi target.', 36, bulletY);
  
  // Bullet 2: Zi
  doc.text('\u2022', 18, bulletY + 6);
  doc.setFont('helvetica', 'italic'); doc.text('Z', 23, bulletY + 6); 
  doc.setFontSize(7); doc.text('i', 26, bulletY + 7.5); doc.setFontSize(10);
  doc.setFont('helvetica', 'normal'); doc.text(':', 32, bulletY + 6);
  doc.text('Harga di titik sampel ke-i.', 36, bulletY + 6);

  // Bullet 3: di
  doc.text('\u2022', 18, bulletY + 12);
  doc.setFont('helvetica', 'italic'); doc.text('d', 23, bulletY + 12); 
  doc.setFontSize(7); doc.text('i', 26, bulletY + 13.5); doc.setFontSize(10);
  doc.setFont('helvetica', 'normal'); doc.text(':', 32, bulletY + 12);
  doc.text('Jarak dari lokasi target ke titik sampel ke-i.', 36, bulletY + 12);

  // Bullet 4: p
  doc.text('\u2022', 18, bulletY + 18);
  doc.setFont('helvetica', 'italic'); doc.text('p', 23, bulletY + 18); 
  doc.setFont('helvetica', 'normal'); doc.text(':', 32, bulletY + 18);
  doc.text(`Parameter power (dalam laporan ini p = ${result.powerUsed}).`, 36, bulletY + 18);

  const afterBulletY = bulletY + 26;

  // --- EXECUTIVE SUMMARY ---
  doc.setFillColor(240, 248, 255); // Light blue background
  doc.rect(14, afterBulletY, 182, 25, 'F');
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Estimasi Nilai Pasar Lahan:', 20, afterBulletY + 9);
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 150, 136); // Emerald tone
  doc.text(`${formatIDR(result.predictedPrice)} / m²`, 20, afterBulletY + 19);
  
  // Reset text color
  doc.setTextColor(0, 0, 0);

  // --- TABEL TRANSPARANSI (AUTOTABLE) ---
  const tableY = afterBulletY + 35;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Analisis Sampel: 5 Kontributor Bobot Terbesar', 14, tableY);

  // Calculate totals for footer
  let totalWeight = 0;
  let totalWeightedValue = 0;

  const tableData = result.nearestPoints.map((point) => {
    const distance = point.distance || 0;
    const weight = point.weight || 0;
    const weightedValue = point.price * weight;
    
    totalWeight += weight;
    totalWeightedValue += weightedValue;

    return [
      `#${point.id}`,
      formatIDR(point.price),
      formatDistance(distance),
      weight.toFixed(6),
      formatIDR(weightedValue)
    ];
  });

  // Create table
  autoTable(doc, {
    startY: tableY + 5,
    head: [['ID Titik', 'Harga Asli (Z)', 'Jarak ke Target (d)', `Bobot (w = 1/d^${result.powerUsed})`, 'Nilai Terbobot (Z * w)']],
    body: tableData,
    foot: [
      [
        { content: 'SUBTOTAL (Top 5 Kontributor)', colSpan: 3, styles: { halign: 'right', fontStyle: 'italic', textColor: 100 } },
        { content: totalWeight.toFixed(6), styles: { fontStyle: 'italic', textColor: 100 } },
        { content: formatIDR(totalWeightedValue), styles: { fontStyle: 'italic', textColor: 100 } }
      ]
    ],
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    footStyles: { fillColor: [245, 245, 245] },
    styles: { fontSize: 9, cellPadding: 3 },
  });

  // @ts-ignore (autotable injects finalY)
  let currentY = doc.lastAutoTable.finalY + 10;
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Deteksi otomatis jika sisa ruang di halaman habis (kurang dari 40mm)
  if (currentY > pageHeight - 40) {
    doc.addPage();
    currentY = 20; // Reset Y ke atas halaman baru
  }
  
  // --- FOOTNOTE TABEL ---
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 100, 100);
  
  const totalSamples = result.totalSamplesUsed ?? result.nearestPoints.length;
  const tableNote = `Catatan: Estimasi nilai akhir dihitung menggunakan seluruh data sampel (N=${totalSamples}) yang valid dalam radius ${result.radiusUsed} km. Tabel di atas hanya menampilkan 5 titik dengan kontribusi bobot tertinggi sebagai referensi transparansi perhitungan spasial. Hasil prediksi ini adalah output algoritmik untuk keperluan simulasi akademis.`;
  const splitTableNote = doc.splitTextToSize(tableNote, 182);
  doc.text(splitTableNote, 14, currentY);

  // --- LOGIKA SPASIAL ---
  currentY += (splitTableNote.length * 4) + 5;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text('Logika Spasial:', 14, currentY);
  
  doc.setFont('helvetica', 'normal');
  if (result.nearestPoints.length > 0) {
    const nearest = result.nearestPoints[0];
    const spatialText = `Jarak ke titik terdekat: ${formatDistance(nearest.distance || 0)} (Titik ID: #${nearest.id}). Status: Valid (Dalam jangkauan radius analisis).`;
    doc.text(spatialText, 14, currentY + 6);
  } else {
    doc.text('Tidak ada titik valid di dalam radius analisis.', 14, currentY + 6);
  }

  // --- FOOTER / DISCLAIMER ---
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(150, 150, 150);
  
  const disclaimer = "Dihasilkan secara otomatis oleh Sistem Prediksi Harga Lahan Koridor IKN. Untuk keperluan akademik Mata Kuliah Metode Numerik.";
  
  // Tambahkan footer di setiap halaman
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(disclaimer, 14, pageHeight - 10);
  }

  // --- SAVE ---
  doc.save(`Laporan-Analisis-Spasial-IDW-${new Date().getTime()}.pdf`);
};
