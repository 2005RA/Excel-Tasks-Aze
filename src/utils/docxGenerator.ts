/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, HeadingLevel, AlignmentType, BorderStyle, WidthType } from 'docx';
import { workbookTopics, workbookAnswers } from '../data/workbookData';

export async function generateWorkbookDocx(): Promise<Blob> {
  const childrenElements: any[] = [];

  // 1. Title / Header
  childrenElements.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 100 },
      children: [
        new TextRun({
          text: 'EXCEL SEHRLİ DÜNYASI',
          bold: true,
          size: 32,
          color: '1E3A8A', // Deep Blue
          font: 'Calibri',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      children: [
        new TextRun({
          text: '10 Yaşlılar Üçün Əyləncəli və Praktik Excel Öyrənmə Kitabçası',
          italics: true,
          size: 24,
          color: '4B5563', // Slate gray
          font: 'Calibri',
        }),
      ],
    }),
    new Paragraph({
      spacing: { after: 300 },
      children: [
        new TextRun({
          text: 'Salam! Bu kitabça sənin Excel-in sehrli dünyasını asanlıqla öyrənməyin üçün hazırlanıb. Hər mövzuda maraqlı hekayələr (analogiyalar), addım-addım həll edilmiş nümunələr və sənin üçün maraqlı tapşırıqlar var. Kitabçanın ən sonunda isə bütün tapşırıqların cavabları yerləşir. Hazırsansa, başlayaq! 🚀',
          size: 22,
          font: 'Calibri',
        }),
      ],
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: '------------------------------------------------------------------------------------------------------------------------',
          color: 'E5E7EB',
        }),
      ],
      spacing: { after: 400 },
    })
  );

  // 2. Loop through all topics
  workbookTopics.forEach((topic) => {
    // Topic Title
    childrenElements.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
        children: [
          new TextRun({
            text: `MÖVZU: ${topic.title.toUpperCase()}`,
            bold: true,
            size: 28,
            color: '1E3A8A',
            font: 'Calibri',
          }),
        ],
      })
    );

    // Analogy Block
    childrenElements.push(
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [
          new TextRun({
            text: `💡 Heç belə düşünmüsən? — ${topic.analogyTitle}`,
            bold: true,
            size: 22,
            color: 'D97706', // Warm Amber
            font: 'Calibri',
          }),
        ],
      }),
      new Paragraph({
        spacing: { after: 300 },
        children: [
          new TextRun({
            text: topic.analogyContent,
            italics: true,
            size: 20,
            color: '4B5563',
            font: 'Calibri',
          }),
        ],
      })
    );

    // Detailed Explanation
    childrenElements.push(
      new Paragraph({
        spacing: { before: 100, after: 100 },
        children: [
          new TextRun({
            text: '📖 Mövzunun İzahı:',
            bold: true,
            size: 22,
            color: '10B981', // Emerald green
            font: 'Calibri',
          }),
        ],
      }),
      new Paragraph({
        spacing: { after: 300 },
        children: [
          new TextRun({
            text: topic.explanation,
            size: 20,
            font: 'Calibri',
          }),
        ],
      })
    );

    // 3 Solved Examples
    if (topic.solvedExamples && topic.solvedExamples.length > 0) {
      childrenElements.push(
        new Paragraph({
          spacing: { before: 200, after: 100 },
          children: [
            new TextRun({
              text: '✨ Addım-Addım Həll Edilmiş Nümunələr:',
              bold: true,
              size: 22,
              color: '2563EB',
              font: 'Calibri',
            }),
          ],
        })
      );

      topic.solvedExamples.forEach((ex, idx) => {
        childrenElements.push(
          new Paragraph({
            spacing: { before: 150, after: 100 },
            children: [
              new TextRun({
                text: ex.title,
                bold: true,
                size: 20,
                color: '1F2937',
                font: 'Calibri',
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: ex.description,
                size: 18,
                color: '4B5563',
                font: 'Calibri',
              }),
            ],
          })
        );

        // Render Example Table
        const tableRows = [
          // Header row
          new TableRow({
            children: ex.tableData.headers.map(
              (header) =>
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({ text: header, bold: true, size: 18, font: 'Calibri', color: 'FFFFFF' }),
                      ],
                    }),
                  ],
                  shading: { fill: '1E3A8A' },
                })
            ),
          }),
          // Data rows
          ...ex.tableData.rows.map(
            (row) =>
              new TableRow({
                children: row.map(
                  (cell) =>
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [new TextRun({ text: cell, size: 18, font: 'Calibri' })],
                        }),
                      ],
                    })
                ),
              })
          ),
        ];

        childrenElements.push(
          new Table({
            rows: tableRows,
            width: { size: 100, type: WidthType.PERCENTAGE },
          })
        );

        // Step-by-step
        childrenElements.push(
          new Paragraph({
            spacing: { before: 100, after: 50 },
            children: [
              new TextRun({ text: 'Necə həll etməli?', bold: true, size: 18, color: '1E3A8A', font: 'Calibri' }),
            ],
          })
        );

        ex.stepByStep.forEach((step, sIdx) => {
          childrenElements.push(
            new Paragraph({
              spacing: { after: 50 },
              indent: { left: 240 }, // Indent
              children: [
                new TextRun({
                  text: `👉 Addım ${sIdx + 1}: ${step}`,
                  size: 18,
                  font: 'Calibri',
                }),
              ],
            })
          );
        });

        childrenElements.push(
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({ text: 'İstifadə olunmuş düstur: ', size: 18, font: 'Calibri' }),
              new TextRun({ text: ex.formulaUsed, bold: true, size: 18, color: 'DC2626', font: 'Calibri' }),
              new TextRun({ text: ` | Nəticə xanası: `, size: 18, font: 'Calibri' }),
              new TextRun({ text: ex.resultCell, bold: true, size: 18, color: '1E3A8A', font: 'Calibri' }),
              new TextRun({ text: ` | Nəticə: `, size: 18, font: 'Calibri' }),
              new TextRun({ text: ex.resultValue, bold: true, size: 18, color: '10B981', font: 'Calibri' }),
            ],
          })
        );
      });
    }

    // 10 Tasks per topic (or less if lighter topic)
    childrenElements.push(
      new Paragraph({
        spacing: { before: 300, after: 150 },
        children: [
          new TextRun({
            text: '📝 Mövzuya Aid Tapşırıqlar:',
            bold: true,
            size: 22,
            color: '7C3AED', // Purple
            font: 'Calibri',
          }),
        ],
      })
    );

    topic.tasks.forEach((task) => {
      // Guide indicators
      let guideBadge = 'Köməksiz sərbəst tapşırıq';
      let badgeColor = 'DC2626'; // Red
      if (task.guideLevel === 'high') {
        guideBadge = 'Tam köməkli / Asan';
        badgeColor = '10B981'; // Green
      } else if (task.guideLevel === 'medium') {
        guideBadge = 'Yarı köməkli / Orta';
        badgeColor = 'D97706'; // Amber
      }

      childrenElements.push(
        new Paragraph({
          spacing: { before: 200, after: 100 },
          children: [
            new TextRun({
              text: `📍 ${task.title}`,
              bold: true,
              size: 20,
              color: '1F2937',
              font: 'Calibri',
            }),
            new TextRun({
              text: ` (${guideBadge})`,
              italics: true,
              size: 16,
              color: badgeColor,
              font: 'Calibri',
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 150 },
          children: [
            new TextRun({
              text: task.description,
              size: 18,
              font: 'Calibri',
            }),
          ],
        })
      );

      // Render Task initial table
      const taskTableRows = [
        new TableRow({
          children: task.initialTable.headers.map(
            (h) =>
              new TableCell({
                children: [
                  new Paragraph({
                    children: [new TextRun({ text: h, bold: true, size: 18, font: 'Calibri', color: 'FFFFFF' })],
                  }),
                ],
                shading: { fill: '4F46E5' }, // Indigo header
              })
          ),
        }),
        ...task.initialTable.rows.map(
          (r) =>
            new TableRow({
              children: r.map(
                (c) =>
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: String(c), size: 18, font: 'Calibri' })],
                      }),
                    ],
                  })
              ),
            })
        ),
      ];

      childrenElements.push(
        new Table({
          rows: taskTableRows,
          width: { size: 100, type: WidthType.PERCENTAGE },
        })
      );

      if (task.guideText) {
        childrenElements.push(
          new Paragraph({
            spacing: { before: 100, after: 150 },
            children: [
              new TextRun({ text: '💡 Yol göstərici: ', bold: true, size: 18, color: 'D97706', font: 'Calibri' }),
              new TextRun({ text: task.guideText, italics: true, size: 18, color: '4B5563', font: 'Calibri' }),
            ],
          })
        );
      } else {
        childrenElements.push(new Paragraph({ spacing: { after: 150 } }));
      }
    });

    childrenElements.push(
      new Paragraph({
        children: [
          new TextRun({
            text: '------------------------------------------------------------------------------------------------------------------------',
            color: 'E5E7EB',
          }),
        ],
        spacing: { before: 400, after: 400 },
      })
    );
  });

  // 3. Answers (Cavablar) Section
  childrenElements.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 400, after: 200 },
      children: [
        new TextRun({
          text: '🔑 TAPŞIRIQLARIN CAVABLARI',
          bold: true,
          size: 26,
          color: '10B981',
          font: 'Calibri',
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
      children: [
        new TextRun({
          text: 'Əziz müəllim və şagird, tapşırıqları bitirdikdən sonra cavablarınızı buradan yoxlaya bilərsiniz!',
          italics: true,
          size: 18,
          color: '4B5563',
          font: 'Calibri',
        }),
      ],
    })
  );

  // Build the list of answers for addition, sum, average, count
  const calculationKeys: Array<keyof typeof workbookAnswers> = ['addition', 'sum', 'average', 'count'];

  calculationKeys.forEach((key) => {
    const topic = workbookTopics.find((t) => t.id === key);
    if (!topic) return;

    childrenElements.push(
      new Paragraph({
        spacing: { before: 200, after: 100 },
        children: [
          new TextRun({
            text: `Mövzu: ${topic.title}`,
            bold: true,
            size: 20,
            color: '1E3A8A',
            font: 'Calibri',
          }),
        ],
      })
    );

    const topicAnswers = workbookAnswers[key];
    topicAnswers.forEach((ans) => {
      childrenElements.push(
        new Paragraph({
          spacing: { after: 50 },
          indent: { left: 240 },
          children: [
            new TextRun({ text: `🔹 Tapşırıq ${ans.task}: `, bold: true, size: 18, font: 'Calibri' }),
            new TextRun({ text: `Düstur: `, size: 18, font: 'Calibri' }),
            new TextRun({ text: ans.formula, bold: true, size: 18, color: 'DC2626', font: 'Calibri' }),
            new TextRun({ text: ` | Nəticə dəyəri: `, size: 18, font: 'Calibri' }),
            new TextRun({ text: ans.value, bold: true, size: 18, color: '10B981', font: 'Calibri' }),
          ],
        })
      );
    });
  });

  // Now pack it into a Document
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: childrenElements,
      },
    ],
  });

  return await Packer.toBlob(doc);
}
