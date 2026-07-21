/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Topic } from '../types';

export const workbookTopics: Topic[] = [
  {
    id: 'addition',
    title: 'Sadə Toplama (+)',
    analogyTitle: 'Sehrli Rəf və Oyuncaqlar',
    analogyContent: 'Təsəvvür et ki, rəfdə 2 oyuncaq qutusu var. Birində 3 ayı, digərində isə 5 maşın var. Onları bir rəfə yığsaq neçə oyuncaq olar? Biz sadəcə 3 və 5-i toplayırıq: 3 + 5 = 8. Excel-də də fərqli qutulardakı (xanalardakı) ədədləri toplamaq üçün aralarına sadəcə "+" işarəsi qoyuruq. Amma unutma, Excel-də hər bir düstur mütləq bərabərlik "=" işarəsi ilə başlamalıdır! Məsələn: =A1+B1',
    iconName: 'Plus',
    explanation: 'Sadə toplama (+) iki və ya bir neçə xanadakı ədədləri bir-biri ilə toplamaq üçün istifadə olunur. Böyük cədvəllərdə hər xananı tək-tək yazmaq çətin olsa da, 2-3 xananı toplamaq üçün bu ən sürətli üsuldur.',
    isCalculation: true,
    solvedExamples: [
      {
        title: 'Nümunə 1: Alma və Armudların Cəmi',
        description: 'A1 xanasında almaların sayı (12), B1 xanasında isə armudların sayı (15) yazılıb. Onların ümumi sayını C1 xanasında hesablayaq.',
        tableData: {
          headers: ['Meyvə', 'Sayı'],
          rows: [['Almalar (A1)', '12'], ['Armudlar (B1)', '15'], ['Cəmi (C1)', '=A1+B1']]
        },
        stepByStep: [
          'C1 xanasına kliklə.',
          'Klaviaturada "=" yaz, sonra A1 xanasını seç (və ya əllə A1 yaz).',
          '"+" işarəsini yaz.',
          'B1 xanasını seç (və ya əllə B1 yaz).',
          'Düstur belə görünəcək: "=A1+B1". "Enter" düyməsini bas.'
        ],
        formulaUsed: '=A1+B1',
        resultCell: 'B3',
        resultValue: '27'
      },
      {
        title: 'Nümunə 2: Həftəsonu Alış-verişi',
        description: 'Şənbə günü xərclənən pul A2 xanasında (20 AZN), Bazar günü xərclənən isə B2 xanasındadır (15 AZN). Ümumi xərci C2 xanasında hesablayaq.',
        tableData: {
          headers: ['Şənbə (A2)', 'Bazar (B2)', 'Ümumi (C2)'],
          rows: [['20', '15', '=A2+B2']]
        },
        stepByStep: [
          'C2 xanasına kliklə.',
          'Düsturu yaz: "=A2+B2"',
          'Enter bas və nəticənin 35 olduğunu gör.'
        ],
        formulaUsed: '=A2+B2',
        resultCell: 'C2',
        resultValue: '35'
      },
      {
        title: 'Nümunə 3: Kitab rəfi',
        description: 'Rəfdəki dərsliklərin sayı A3 xanasında (8), bədii kitablar B3 xanasında (14) yazılıb. Cəmi kitabları C3-də hesablayaq.',
        tableData: {
          headers: ['Dərslik (A3)', 'Bədii (B3)', 'Ümumi (C3)'],
          rows: [['8', '14', '=A3+B3']]
        },
        stepByStep: [
          'C3 xanasına kliklə.',
          'Düsturu yaz: "=A3+B3"',
          'Enter düyməsini sıx. Cavab 22 olacaq.'
        ],
        formulaUsed: '=A3+B3',
        resultCell: 'C3',
        resultValue: '22'
      }
    ],
    tasks: [
      {
        id: 1,
        title: 'Tapşırıq 1: Şarlarla Oyun',
        description: 'Lalənin A2 xanasında 5 qırmızı şarı var. B2 xanasında isə 7 mavi şarı var. Lalənin cəmi neçə şarı olduğunu C2 xanasında sadə "+" düsturu ilə hesablayın.',
        guideLevel: 'high',
        guideText: 'Addım 1: A2 xanasına "5" yazın. Addım 2: B2 xanasına "7" yazın. Addım 3: C2 xanasına klikləyin. Addım 4: Düstur hissəsinə "=A2+B2" yazın və Enter düyməsini basın.',
        initialTable: {
          headers: ['Qırmızı (A2)', 'Mavi (B2)', 'Cəmi (C2)'],
          rows: [['5', '7', '']],
          startCell: 'A1'
        },
        correctFormulaCell: 'C2',
        correctFormulaRegex: '^=A2\\+B2$',
        correctValue: '12'
      },
      {
        id: 2,
        title: 'Tapşırıq 2: Qələm qutusu',
        description: 'A3 xanasında 10 rəngli qələm, B3 xanasında isə 8 sadə qələm var. Cəmi qələmləri C3 xanasında "+" düsturu ilə hesablayın.',
        guideLevel: 'high',
        guideText: 'Addım 1: A3 xanasına "10" yazın. Addım 2: B3 xanasına "8" yazın. Addım 3: C3 xanasına klikləyib "=A3+B3" yazın və Enter basın.',
        initialTable: {
          headers: ['Rəngli (A3)', 'Sadə (B3)', 'Cəmi (C3)'],
          rows: [['10', '8', '']],
          startCell: 'A2'
        },
        correctFormulaCell: 'C3',
        correctFormulaRegex: '^=A3\\+B3$',
        correctValue: '18'
      },
      {
        id: 3,
        title: 'Tapşırıq 3: İki Günlük Şirniyyat',
        description: 'Əli birinci gün A4 xanasında 4 şokolad, ikinci gün B4 xanasında 3 şokolad yedi. İki gündə yeyilən cəmi şokoladları C4 xanasında "+" düsturu ilə tapın.',
        guideLevel: 'high',
        guideText: 'Addım 1: A4 xanasına "4", B4-ə "3" yazın. Addım 2: C4 xanasına keçin. Addım 3: Düstur satırına "=A4+B4" yazın və Enter basın.',
        initialTable: {
          headers: ['1-ci gün (A4)', '2-ci gün (B4)', 'Cəmi (C4)'],
          rows: [['4', '3', '']],
          startCell: 'A3'
        },
        correctFormulaCell: 'C4',
        correctFormulaRegex: '^=A4\\+B4$',
        correctValue: '7'
      },
      {
        id: 4,
        title: 'Tapşırıq 4: Pul Yığımı',
        description: 'A5 xanasında sənin cib xərcliyin (15 AZN), B5 xanasında isə babanın verdiyi hədiyyə pul (10 AZN) var. Ümumi pulunu C5 xanasında topla.',
        guideLevel: 'high',
        guideText: 'C5 xanasına klikləyin. Düstur olaraq "=A5+B5" yazın və Enter sıxın.',
        initialTable: {
          headers: ['Mənim pulum (A5)', 'Hədiyyə (B5)', 'Cəmi (C5)'],
          rows: [['15', '10', '']],
          startCell: 'A4'
        },
        correctFormulaCell: 'C5',
        correctFormulaRegex: '^=A5\\+B5$',
        correctValue: '25'
      },
      {
        id: 5,
        title: 'Tapşırıq 5: Pul Kisəsi',
        description: 'Cədvəldəki iki fərqli pul məbləğini (A6 və B6 xanalarında) toplayaraq C6 xanasına yazın.',
        guideLevel: 'medium',
        guideText: 'C6 xanasına klikləyib müvafiq "+" düsturunu yazın. Düstur mütləq "=" ilə başlamalıdır.',
        initialTable: {
          headers: ['Pul 1 (A6)', 'Pul 2 (B6)', 'Cəmi (C6)'],
          rows: [['35', '45', '']],
          startCell: 'A5'
        },
        correctFormulaCell: 'C6',
        correctFormulaRegex: '^=A6\\+B6$',
        correctValue: '80'
      },
      {
        id: 6,
        title: 'Tapşırıq 6: Heyvanlar aləmi',
        description: 'Təsərrüfatda A7 xanasında 25 quzu və B7 xanasında 15 keçi var. Cəmi heyvan sayını C7 xanasında hesablayın.',
        guideLevel: 'medium',
        guideText: 'C7 xanasını seçin və A7 ilə B7 xanalarını toplamaq üçün sadə düstur yazın.',
        initialTable: {
          headers: ['Quzular (A7)', 'Keçilər (B7)', 'Cəmi (C7)'],
          rows: [['25', '15', '']],
          startCell: 'A6'
        },
        correctFormulaCell: 'C7',
        correctFormulaRegex: '^=A7\\+B7$',
        correctValue: '40'
      },
      {
        id: 7,
        title: 'Tapşırıq 7: Sinifdəki Partalar',
        description: 'Məktəbin birinci mərtəbəsində A8 xanasında 14 parta, ikinci mərtəbəsində B8 xanasında 16 parta var. Ümumi partaları C8-də toplayın.',
        guideLevel: 'medium',
        guideText: 'C8 xanasına keçin və düsturunuzu daxil edin. İki xananın cəmini tapmaq üçün "+" istifadə edin.',
        initialTable: {
          headers: ['1-ci mərtəbə (A8)', '2-ci mərtəbə (B8)', 'Cəmi (C8)'],
          rows: [['14', '16', '']],
          startCell: 'A7'
        },
        correctFormulaCell: 'C8',
        correctFormulaRegex: '^=A8\\+B8$',
        correctValue: '30'
      },
      {
        id: 8,
        title: 'Tapşırıq 8: Ad günü Tortu',
        description: 'Sənin ad gününə gələn qonaqlardan A9 xanasındakılar oğlanlar (12 nəfər), B9 xanasındakılar isə qızlardır (18 nəfər). Cəmi qonaqların sayını C9 xanasında hesablayın.',
        guideLevel: 'none',
        guideText: 'Heç bir təlimat yoxdur. Sərbəst şəkildə düsturu yazın!',
        initialTable: {
          headers: ['Oğlanlar (A9)', 'Qızlar (B9)', 'Cəmi (C9)'],
          rows: [['12', '18', '']],
          startCell: 'A8'
        },
        correctFormulaCell: 'C9',
        correctFormulaRegex: '^=A9\\+B9$',
        correctValue: '30'
      },
      {
        id: 9,
        title: 'Tapşırıq 9: Meyvə bağı',
        description: 'Bağdan A10 xanasında 50 kq alma və B10 xanasında 35 kq armud dərildi. Cəmi dərildiyi meyvəni C10 xanasında hesablayın.',
        guideLevel: 'none',
        guideText: 'Heç bir təlimat yoxdur. Sərbəst şəkildə toplama düsturunu yazın.',
        initialTable: {
          headers: ['Almalar (A10)', 'Armudlar (B10)', 'Cəmi (C10)'],
          rows: [['50', '35', '']],
          startCell: 'A9'
        },
        correctFormulaCell: 'C10',
        correctFormulaRegex: '^=A10\\+B10$',
        correctValue: '85'
      },
      {
        id: 10,
        title: 'Tapşırıq 10: Oyun xalları',
        description: 'Kompüter oyununda 1-ci mərhələdə A11 xanasında 150 xal, 2-ci mərhələdə B11 xanasında 250 xal topladın. Cəmi xallarını C11 xanasında hesablayın.',
        guideLevel: 'none',
        guideText: 'Artıq peşəkarsan! Düsturu sərbəst şəkildə yaz.',
        initialTable: {
          headers: ['Mərhələ 1 (A11)', 'Mərhələ 2 (B11)', 'Cəmi (C11)'],
          rows: [['150', '250', '']],
          startCell: 'A10'
        },
        correctFormulaCell: 'C11',
        correctFormulaRegex: '^=A11\\+B11$',
        correctValue: '400'
      }
    ]
  },
  {
    id: 'sum',
    title: 'SUM (Cəm) Düsturu',
    analogyTitle: 'Sehrli Basketbol Səbəti',
    analogyContent: 'Təsəvvür et ki, yerdə çoxlu sayda toplar var. Hər topun üstündə bir rəqəm yazılıb. Əgər biz hər topu tək-tək götürüb toplamaq istəsək, çox yorulacağıq: top1 + top2 + top3... Bunun əvəzinə bizim "Sehrli Səbətimiz" var! Bu səbətin adı SUM-dır. Biz Excel-ə deyirik: "=SUM(ilkin_top : son_top)". Excel dərhal həmin aralıqdakı bütün topları səbətə yığır və cəmini bizə saniyədə tapır! Məsələn: =SUM(B2:B6)',
    iconName: 'Sigma',
    explanation: 'SUM düsturu Excel-də seçilmiş xanalar aralığındakı bütün ədədləri sürətlə toplamaq üçün ən çox istifadə olunan düsturdur. Xanalar ardıcıl olduqda iki nöqtə (:) ilə aralığı bildiririk (məsələn, B2:B10).',
    isCalculation: true,
    solvedExamples: [
      {
        title: 'Nümunə 1: Həftəlik cib xərcləri',
        description: 'B2 xanasından B6 xanasına qədər həftə içi günlərində aldığın pullar yazılıb. Ümumi məbləği B7 xanasında SUM düsturu ilə hesablayaq.',
        tableData: {
          headers: ['Günlər', 'Məbləğ (B2:B6)'],
          rows: [
            ['Bazar ertəsi', '2'],
            ['Çərşənbə axşamı', '3'],
            ['Çərşənbə', '2'],
            ['Cümə axşamı', '4'],
            ['Cümə', '3'],
            ['CƏMİ (B7)', '=SUM(B2:B6)']
          ]
        },
        stepByStep: [
          'B7 xanasına klikləyin.',
          '"=" yazın, sonra böyük hərflərlə "SUM(" yazın (və ya AZ dilindədirsə "CƏM(").',
          'Siçanla (mouse) B2 xanasından tutub B6 xanasına qədər aşağıya doğru sürüşdürərək xanaları seçin.',
          'Düstur satırında "=SUM(B2:B6)" yazıldığını görəcəksiniz.',
          'Mötərizəni bağlayın ")" və Enter basın. Cavab 14 olacaq.'
        ],
        formulaUsed: '=SUM(B2:B6)',
        resultCell: 'B7',
        resultValue: '14'
      },
      {
        title: 'Nümunə 2: Meyvə mağazası satışı',
        description: 'Mağazada satılan meyvələrin çəkisi C2, C3, C4 xanalarında yazılıb. Cəmi çəkini C5 xanasında hesablayaq.',
        tableData: {
          headers: ['Meyvə', 'Çəki (C2:C4)'],
          rows: [
            ['Alma', '15'],
            ['Armud', '10'],
            ['Banan', '25'],
            ['Cəmi (C5)', '=SUM(C2:C4)']
          ]
        },
        stepByStep: [
          'C5 xanasına kliklə.',
          '"=SUM(C2:C4)" düsturunu yaz.',
          'Enter düyməsini bas. Cavab 50 kq olacaq.'
        ],
        formulaUsed: '=SUM(C2:C4)',
        resultCell: 'C5',
        resultValue: '50'
      },
      {
        title: 'Nümunə 3: Kitab səhifələri',
        description: '3 gün ərzində oxunan kitab səhifələri D2, D3, D4 xanalarındadır. Cəmi oxunmuş səhifələri D5-də hesablayaq.',
        tableData: {
          headers: ['Günlər', 'Səhifə (D2:D4)'],
          rows: [
            ['1-ci gün', '12'],
            ['2-ci gün', '18'],
            ['3-cü gün', '20'],
            ['Cəmi (D5)', '=SUM(D2:D4)']
          ]
        },
        stepByStep: [
          'D5 xanasına kliklə.',
          '"=SUM(D2:D4)" daxil et.',
          'Enter sıx. Cavab 50 olacaq.'
        ],
        formulaUsed: '=SUM(D2:D4)',
        resultCell: 'D5',
        resultValue: '50'
      }
    ],
    tasks: [
      {
        id: 1,
        title: 'Tapşırıq 1: Şirniyyat mağazası',
        description: 'Aşağıdakı cədvəldə satılan şirniyyatların sayları verilib. B2-dən B4-ə qədər olan xanaların cəmini B5 xanasında SUM düsturu ilə hesablayın.',
        guideLevel: 'high',
        guideText: 'Addım 1: B5 xanasına klikləyin. Addım 2: "=SUM(" yazın. Addım 3: Siçanla B2-dən B4-ə qədər olan xanaları çəkərək seçin və ya əllə "B2:B4" yazın. Addım 4: Mötərizəni bağlayın ")" və Enter düyməsini basın.',
        initialTable: {
          headers: ['Şirniyyat', 'Sayı (B)'],
          rows: [
            ['Keks', '10'],
            ['Peçenye', '15'],
            ['Piroq', '8'],
            ['CƏMİ', '']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'B5',
        correctFormulaRegex: '^=SUM\\(B2:B4\\)$',
        correctValue: '33'
      },
      {
        id: 2,
        title: 'Tapşırıq 2: Oyuncaq Səbəti',
        description: 'Cədvəldə müxtəlif rəfərdəki oyuncaqların sayı B2:B5 xanalarında qeyd edilib. Ümumi oyuncaq sayını B6 xanasında SUM düsturu ilə hesablayın.',
        guideLevel: 'high',
        guideText: 'B6 xanasına klikləyin. Düstur satırına "=SUM(B2:B5)" yazın və klaviaturadan Enter düyməsini sıxın.',
        initialTable: {
          headers: ['Rəf', 'Oyuncaq sayı (B)'],
          rows: [
            ['Rəf 1', '7'],
            ['Rəf 2', '12'],
            ['Rəf 3', '5'],
            ['Rəf 4', '9'],
            ['CƏMİ', '']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'B6',
        correctFormulaRegex: '^=SUM\\(B2:B5\\)$',
        correctValue: '33'
      },
      {
        id: 3,
        title: 'Tapşırıq 3: İdman xalları',
        description: 'Məktəb futbol komandasının 4 oyunda vurduğu qollar B2:B5 xanalarındadır. Cəmi qol sayını B6 xanasında SUM ilə tapın.',
        guideLevel: 'high',
        guideText: 'B6 xanasına "=SUM(B2:B5)" yazın. Mötərizələrin düzgün açılıb bağlandığına və aralarında ":" olduğuna əmin olun.',
        initialTable: {
          headers: ['Oyun', 'Qollar (B)'],
          rows: [
            ['Oyun 1', '3'],
            ['Oyun 2', '1'],
            ['Oyun 3', '4'],
            ['Oyun 4', '2'],
            ['Cəmi Qollar', '']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'B6',
        correctFormulaRegex: '^=SUM\\(B2:B5\\)$',
        correctValue: '10'
      },
      {
        id: 4,
        title: 'Tapşırıq 4: Şagirdlərin Kitabları',
        description: 'Dörd şagirdin oxuduğu kitab sayları B2:B5 xanalarında göstərilib. Onların cəmi neçə kitab oxuduqlarını B6 xanasında hesablayın.',
        guideLevel: 'high',
        guideText: 'B6 xanasını seçin, "=SUM(B2:B5)" yazıb Enter düyməsini basın.',
        initialTable: {
          headers: ['Şagird', 'Kitab sayı (B)'],
          rows: [
            ['Ayan', '6'],
            ['Murad', '8'],
            ['Fidan', '11'],
            ['Kənan', '5'],
            ['Cəmi', '']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'B6',
        correctFormulaRegex: '^=SUM\\(B2:B5\\)$',
        correctValue: '30'
      },
      {
        id: 5,
        title: 'Tapşırıq 5: Pul Qutusu',
        description: 'Həftəlik yığılan qəpiklər B2:B6 xanalarında yazılıb. Cəmi qəpiklərin sayını B7 xanasında SUM düsturu ilə tapın.',
        guideLevel: 'medium',
        guideText: 'B7 xanasına keçin. B2-dən B6-ya qədər olan aralığı toplamaq üçün "=SUM(...)" düsturundan istifadə edin.',
        initialTable: {
          headers: ['Gün', 'Qəpiklər (B)'],
          rows: [
            ['Bazar ertəsi', '20'],
            ['Çərşənbə axşamı', '15'],
            ['Çərşənbə', '30'],
            ['Cümə axşamı', '25'],
            ['Cümə', '40'],
            ['CƏMİ', '']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'B7',
        correctFormulaRegex: '^=SUM\\(B2:B6\\)$',
        correctValue: '130'
      },
      {
        id: 6,
        title: 'Tapşırıq 6: Meyvə ağacları',
        description: 'Bağdakı meyvə ağaclarının sayları B2:B5 xanalarındadır. Cəmi neçə ağac olduğunu B6-da tapın.',
        guideLevel: 'medium',
        guideText: 'B6 xanasını seçin və SUM düsturu ilə B2-dən B5-ə qədər olan aralığı cəmləyin.',
        initialTable: {
          headers: ['Ağac', 'Sayı (B)'],
          rows: [
            ['Alma ağacı', '14'],
            ['Armud ağacı', '8'],
            ['Albalı ağacı', '12'],
            ['Ərik ağacı', '6'],
            ['Cəmi', '']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'B6',
        correctFormulaRegex: '^=SUM\\(B2:B5\\)$',
        correctValue: '40'
      },
      {
        id: 7,
        title: 'Tapşırıq 7: Ad günü hədiyyələri',
        description: 'Dostlarının sənə ad günündə verdiyi hədiyyələrin qiymətləri B2:B5 xanalarındadır. Hədiyyələrin ümumi dəyərini B6-da tapın.',
        guideLevel: 'medium',
        guideText: 'B6 xanasına klikləyin. SUM düsturunu daxil edin və mötərizədə B2 və B5 arasındakı xanaları göstərin.',
        initialTable: {
          headers: ['Hədiyyə', 'Qiymət (AZN) (B)'],
          rows: [
            ['Oyuncaq', '15'],
            ['Kitab', '10'],
            ['Boyama seti', '12'],
            ['Leqo', '25'],
            ['Cəmi Dəyər', '']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'B6',
        correctFormulaRegex: '^=SUM\\(B2:B5\\)$',
        correctValue: '62'
      },
      {
        id: 8,
        title: 'Tapşırıq 8: Güllərin Sayı',
        description: 'Bağbanın bir həftədə dörd fərqli sahədən topladığı qızılgüllərin sayı B2:B5 xanalarındadır. Cəmi neçə qızılgül toplanıb? B6-da hesablayın.',
        guideLevel: 'none',
        guideText: 'Heç bir kömək yoxdur. Sərbəst şəkildə SUM düsturunu yazıb cavabı yoxlayın!',
        initialTable: {
          headers: ['Sahə', 'Qızılgüllər (B)'],
          rows: [
            ['Sahə A', '45'],
            ['Sahə B', '30'],
            ['Sahə C', '55'],
            ['Sahə D', '40'],
            ['Cəmi', '']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'B6',
        correctFormulaRegex: '^=SUM\\(B2:B5\\)$',
        correctValue: '170'
      },
      {
        id: 9,
        title: 'Tapşırıq 9: Şirniyyat Alışı',
        description: 'Ananın marketdən aldığı ərzaqların qiymətləri B2:B6 xanalarındadır. Cəmi neçə AZN ödədiyini B7 xanasında tapın.',
        guideLevel: 'none',
        guideText: 'Sərbəst şəkildə SUM düsturunu yazın.',
        initialTable: {
          headers: ['Ərzaq', 'Qiymət (AZN) (B)'],
          rows: [
            ['Un', '3'],
            ['Şəkər tozu', '5'],
            ['Süd', '2'],
            ['Yağ', '12'],
            ['Şokolad', '4'],
            ['Cəmi', '']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'B7',
        correctFormulaRegex: '^=SUM\\(B2:B6\\)$',
        correctValue: '26'
      },
      {
        id: 10,
        title: 'Tapşırıq 10: Zoopark sakinləri',
        description: 'Zooparkdakı bəzi heyvanların sayları B2:B6 xanalarında göstərilib. Zooparkdakı bu heyvanların ümumi sayını B7-də hesablayın.',
        guideLevel: 'none',
        guideText: 'Artıq SUM mövzusunu tam mənimsədin! Düsturu sərbəst daxil et.',
        initialTable: {
          headers: ['Heyvan', 'Sayı (B)'],
          rows: [
            ['Meymun', '12'],
            ['Şir', '4'],
            ['Ayı', '6'],
            ['Tovuzquşu', '8'],
            ['Zebra', '5'],
            ['Cəmi', '']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'B7',
        correctFormulaRegex: '^=SUM\\(B2:B6\\)$',
        correctValue: '35'
      }
    ]
  },
  {
    id: 'average',
    title: 'AVERAGE (Ədədi Orta) Düsturu',
    analogyTitle: 'Şirniyyatları Bərabər Bölmək',
    analogyContent: 'Təsəvvür et ki, sənin 3 dostun var. Birində 2 şokolad var, digərində 4 şokolad, üçüncüdə isə 6 şokolad var. Əgər biz bütün şokoladları toplayıb dostların arasında bərabər bölsək, hərəyə neçə şokolad düşər? Cəmi 12 şokolad var (2+4+6=12). Onları 3 nəfər arasında bölsək: 12 / 3 = 4 şokolad olar. Bu, ədədi ortadır! Excel-də bunu etmək üçün "=AVERAGE(ilkin_xana : son_xana)" yazırıq. Excel bütün ədədləri toplayır və sayına bölərək sənə "ədalətli" bərabər payı dərhal göstərir! Məsələn: =AVERAGE(B2:B4)',
    iconName: 'Percent',
    explanation: 'AVERAGE (Ədədi Orta) düsturu seçilmiş xanalar aralığındakı ədədlərin ədədi ortasını tapır. O, əvvəlcə bütün xanaları toplayır, sonra isə həmin xanaların sayına bölür.',
    isCalculation: true,
    solvedExamples: [
      {
        title: 'Nümunə 1: Test Qiymətlərinin Ortası',
        description: 'Murad riyaziyyat fənnindən 3 fərqli testdən B2, B3 və B4 xanalarındakı qiymətləri aldı. Onun orta qiymətini B5-də hesablayaq.',
        tableData: {
          headers: ['Testlər', 'Qiymətlər (B2:B4)'],
          rows: [
            ['Test 1', '80'],
            ['Test 2', '90'],
            ['Test 3', '100'],
            ['Orta Qiymət (B5)', '=AVERAGE(B2:B4)']
          ]
        },
        stepByStep: [
          'B5 xanasına klikləyin.',
          '"=" daxil edin, sonra "AVERAGE(" yazın (və ya AZ dilindədirsə "ORTALAMA(").',
          'Siçanla B2, B3 və B4 xanalarını sürüşdürərək seçin.',
          'Mötərizəni bağlayın ")" və Enter vurun. Cavab 90 olacaq.'
        ],
        formulaUsed: '=AVERAGE(B2:B4)',
        resultCell: 'B5',
        resultValue: '90'
      },
      {
        title: 'Nümunə 2: Həftəlik Temperatur ortalaması',
        description: 'Üç günün temperaturu C2 (25 dərəcə), C3 (20 dərəcə), C4 (30 dərəcə) xanalarında yazılıb. Orta temperaturu C5 xanasında hesablayaq.',
        tableData: {
          headers: ['Gün', 'Temperatur (C2:C4)'],
          rows: [
            ['Bazar ertəsi', '25'],
            ['Çərşənbə axşamı', '20'],
            ['Çərşənbə', '30'],
            ['Orta istilik (C5)', '=AVERAGE(C2:C4)']
          ]
        },
        stepByStep: [
          'C5 xanasına kliklə.',
          '"=AVERAGE(C2:C4)" yaz.',
          'Enter vur. Cavab 25 olacaq.'
        ],
        formulaUsed: '=AVERAGE(C2:C4)',
        resultCell: 'C5',
        resultValue: '25'
      },
      {
        title: 'Nümunə 3: Orta boy uzunluğu',
        description: 'Dostların boy uzunluqları D2 (130 sm), D3 (140 sm) xanalarındadır. Orta boyu D4 xanasında hesablayaq.',
        tableData: {
          headers: ['Dostlar', 'Boy (sm) (D2:D3)'],
          rows: [
            ['Ayan', '130'],
            ['Fərid', '140'],
            ['Orta boy (D4)', '=AVERAGE(D2:D3)']
          ]
        },
        stepByStep: [
          'D4-ə kliklə.',
          '"=AVERAGE(D2:D3)" yaz.',
          'Enter sıx. Cavab 135 sm olacaq.'
        ],
        formulaUsed: '=AVERAGE(D2:D3)',
        resultCell: 'D4',
        resultValue: '135'
      }
    ],
    tasks: [
      {
        id: 1,
        title: 'Tapşırıq 1: Şagirdin Orta Qiyməti',
        description: 'Fidanın 3 fərqli imtahan nəticələri B2:B4 xanalarındadır. Onun orta balını B5 xanasında AVERAGE düsturu ilə hesablayın.',
        guideLevel: 'high',
        guideText: 'Addım 1: B5 xanasını seçin. Addım 2: "=AVERAGE(" yazın. Addım 3: B2-dən B4-ə qədər olan xanaları çəkərək seçin. Addım 4: ")" yazıb Enter düyməsini basın.',
        initialTable: {
          headers: ['İmtahan', 'Qiymət (B)'],
          rows: [
            ['İmtahan 1', '70'],
            ['İmtahan 2', '80'],
            ['İmtahan 3', '90'],
            ['Orta Qiymət', '']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'B5',
        correctFormulaRegex: '^=AVERAGE\\(B2:B4\\)$',
        correctValue: '80'
      },
      {
        id: 2,
        title: 'Tapşırıq 2: Orta Oyun xalı',
        description: 'Kompüter oyununda topladığın xallar B2:B4 xanalarındadır. Oyun başına düşən orta xalını B5-də tapın.',
        guideLevel: 'high',
        guideText: 'B5 xanasına klikləyib "=AVERAGE(B2:B4)" düsturunu daxil edin və Enter düyməsini sıxın.',
        initialTable: {
          headers: ['Mərhələ', 'Xallar (B)'],
          rows: [
            ['Mərhələ A', '150'],
            ['Mərhələ B', '200'],
            ['Mərhələ C', '250'],
            ['Orta xal', '']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'B5',
        correctFormulaRegex: '^=AVERAGE\\(B2:B4\\)$',
        correctValue: '200'
      },
      {
        id: 3,
        title: 'Tapşırıq 3: Gündəlik Yuxu Saatı',
        description: 'Məktəblinin 3 gün ərzində yatdığı saatlar B2:B4 xanalarındadır. Onun orta hesabla gündə neçə saat yatdığını B5-də hesablayın.',
        guideLevel: 'high',
        guideText: 'B5 xanasına "=AVERAGE(B2:B4)" düsturunu daxil edin və Enter-i sıxın.',
        initialTable: {
          headers: ['Gün', 'Yuxu Saatı (B)'],
          rows: [
            ['Gün 1', '8'],
            ['Gün 2', '9'],
            ['Gün 3', '7'],
            ['Orta yuxu', '']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'B5',
        correctFormulaRegex: '^=AVERAGE\\(B2:B4\\)$',
        correctValue: '8'
      },
      {
        id: 4,
        title: 'Tapşırıq 4: Havanın Orta Temperaturu',
        description: 'Həftəsonu dörd fərqli saatda ölçülmüş temperatur B2:B5 xanalarındadır. Orta temperaturu B6-da hesablayın.',
        guideLevel: 'high',
        guideText: 'B6 xanasına klikləyin. Düstur olaraq "=AVERAGE(B2:B5)" daxil edin.',
        initialTable: {
          headers: ['Saat', 'Temperatur (C) (B)'],
          rows: [
            ['Saat 10:00', '18'],
            ['Saat 13:00', '22'],
            ['Saat 16:00', '24'],
            ['Saat 19:00', '16'],
            ['Orta istilik', '']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'B6',
        correctFormulaRegex: '^=AVERAGE\\(B2:B5\\)$',
        correctValue: '20'
      },
      {
        id: 5,
        title: 'Tapşırıq 5: Oyuncaq Qiymətləri',
        description: 'Oyuncaq mağazasındakı bəzi oyuncaqların qiymətləri B2:B5 xanalarındadır. Orta oyuncaq qiymətini B6 xanasında hesablayın.',
        guideLevel: 'medium',
        guideText: 'B6 xanasına "=AVERAGE(B2:B5)" daxil etməklə orta dəyəri hesablayın.',
        initialTable: {
          headers: ['Oyuncaq', 'Qiymət (AZN) (B)'],
          rows: [
            ['Ayı', '12'],
            ['Maşın', '8'],
            ['Kukla', '15'],
            ['Top', '5'],
            ['Orta Qiymət', '']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'B6',
        correctFormulaRegex: '^=AVERAGE\\(B2:B5\\)$',
        correctValue: '10'
      },
      {
        id: 6,
        title: 'Tapşırıq 6: Orta Kitab Səhifəsi',
        description: 'Həftəlik oxuduğun kitabların səhifə sayı B2:B5 xanalarındadır. Orta hesabla kitabların neçə səhifə olduğunu B6 xanasında hesablayın.',
        guideLevel: 'medium',
        guideText: 'B6 xanasını seçib müvafiq AVERAGE düsturunu yazın (B2-dən B5-ə qədər).',
        initialTable: {
          headers: ['Kitab', 'Səhifə (B)'],
          rows: [
            ['Kitab 1', '120'],
            ['Kitab 2', '80'],
            ['Kitab 3', '150'],
            ['Kitab 4', '90'],
            ['Orta Səhifə', '']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'B6',
        correctFormulaRegex: '^=AVERAGE\\(B2:B5\\)$',
        correctValue: '110'
      },
      {
        id: 7,
        title: 'Tapşırıq 7: Bağdan Yığılan Albalı',
        description: 'Bağbanın bir neçə ağacdan yığdığı albalıların çəkisi B2:B5 xanalarındadır. Orta hesabla bir ağacdan neçə kq albalı yığılıb? B6-da tapın.',
        guideLevel: 'medium',
        guideText: 'B6 xanasına keçin və "=AVERAGE(B2:B5)" düsturu daxil edin.',
        initialTable: {
          headers: ['Ağac', 'Albalı (kq) (B)'],
          rows: [
            ['Ağac 1', '14'],
            ['Ağac 2', '18'],
            ['Ağac 3', '10'],
            ['Ağac 4', '22'],
            ['Orta çəki', '']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'B6',
        correctFormulaRegex: '^=AVERAGE\\(B2:B5\\)$',
        correctValue: '16'
      },
      {
        id: 8,
        title: 'Tapşırıq 8: Gündəlik cib xərcləri',
        description: 'Dörd gün ərzində aldığın cib xərcləri B2:B5 xanalarında göstərilib. Orta gündəlik xərcliyini B6 xanasında hesablayın.',
        guideLevel: 'none',
        guideText: 'Heç bir kömək yoxdur. Düsturu sərbəst şəkildə yazın və nəticəni yoxlayın!',
        initialTable: {
          headers: ['Gün', 'Məbləğ (AZN) (B)'],
          rows: [
            ['Bazar ertəsi', '3'],
            ['Çərşənbə axşamı', '5'],
            ['Çərşənbə', '2'],
            ['Cümə axşamı', '6'],
            ['Orta xərc', '']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'B6',
        correctFormulaRegex: '^=AVERAGE\\(B2:B5\\)$',
        correctValue: '4'
      },
      {
        id: 9,
        title: 'Tapşırıq 9: Sinif Şagirdləri',
        description: 'Beş fərqli sinifdəki şagirdlərin sayı B2:B6 xanalarındadır. Orta hesabla bir sinifdə neçə şagird var? B7-də hesablayın.',
        guideLevel: 'none',
        guideText: 'Sərbəst şəkildə AVERAGE düsturu yazın.',
        initialTable: {
          headers: ['Sinif', 'Şagird Sayı (B)'],
          rows: [
            ['5A', '22'],
            ['5B', '18'],
            ['5C', '25'],
            ['5D', '20'],
            ['5E', '15'],
            ['Orta Şagird', '']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'B7',
        correctFormulaRegex: '^=AVERAGE\\(B2:B6\\)$',
        correctValue: '20'
      },
      {
        id: 10,
        title: 'Tapşırıq 10: Ağacların Boyu',
        description: 'Həyətdəki beş müxtəlif ağacın boyu (metrlə) B2:B6 xanalarındadır. Orta ağac boyunu B7 xanasında hesablayın.',
        guideLevel: 'none',
        guideText: 'Bütün köməklər azaldı, artıq özün təkbaşına hər şeyi bacarırsan! Düsturu daxil et.',
        initialTable: {
          headers: ['Ağac', 'Boy (metr) (B)'],
          rows: [
            ['Söyüd', '12'],
            ['Şam', '8'],
            ['Cökə', '15'],
            ['Palıd', '10'],
            ['Küknar', '5'],
            ['Orta Boy', '']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'B7',
        correctFormulaRegex: '^=AVERAGE\\(B2:B6\\)$',
        correctValue: '10'
      }
    ]
  },
  {
    id: 'count',
    title: 'COUNT (Say) Düsturu',
    analogyTitle: 'Balaca Dedektiv',
    analogyContent: 'Təsəvvür et ki, sən dedektivsən! Sənə bir neçə qutu verilib. Bəzi qutuların içində ədədlər var, bəziləri boşdur, bəzilərində isə sadəcə yazı yazılıb (məsələn, "alma"). Sənin tapşırığın yalnız İÇİNDƏ ƏDƏD OLAN qutuları saymaqdır! Excel-də bu dedektiv işini "=COUNT(ilkin_xana : son_xana)" düsturu yerinə yetirir. O, seçdiyin aralıqdakı yalnız rəqəmli xanaları tapır və neçə dənə olduğunu sənə deyir. Boş xanaları və yazıları isə saymır! Məsələn: =COUNT(B2:B6)',
    iconName: 'Binary',
    explanation: 'COUNT düsturu verilmiş aralıqda yalnız ədəd daxil edilmiş xanaların sayını tapmaq üçün istifadə olunur. Mətn və ya boş xanalar sayılmır.',
    isCalculation: true,
    solvedExamples: [
      {
        title: 'Nümunə 1: Hansı gün pul topladım?',
        description: 'Həftənin bəzi günləri pul topladın (B2 və B4-də ədəd var), bəzi günlər isə boş qaldı (B3 boşdur). Neçə gün pul topladığını B5 xanasında hesablayaq.',
        tableData: {
          headers: ['Günlər', 'Yığılan Pul (B2:B4)'],
          rows: [
            ['Bazar ertəsi', '5'],
            ['Çərşənbə axşamı', ''],
            ['Çərşənbə', '10'],
            ['Günlərin Sayı (B5)', '=COUNT(B2:B4)']
          ]
        },
        stepByStep: [
          'B5 xanasına klikləyin.',
          '"=" daxil edin və "COUNT(" yazın (və ya AZ dilindədirsə "SAY(").',
          'B2-dən B4-ə qədər olan aralığı seçin.',
          'Mötərizəni bağlayın ")" və Enter basın. Nəticə 2 olacaq, çünki B3 boşdur!'
        ],
        formulaUsed: '=COUNT(B2:B4)',
        resultCell: 'B5',
        resultValue: '2'
      },
      {
        title: 'Nümunə 2: İmtahana Gələnlərin Sayı',
        description: 'Sinifdə dörd şagirddən üçü imtahanda iştirak edib bal alıb (C2, C3, C4-də ədəd var), biri isə gəlməyib və xanası boşdur. İştirakçı sayını C6-da tapaq.',
        tableData: {
          headers: ['Şagird', 'Bal (C2:C5)'],
          rows: [
            ['Ayan', '85'],
            ['Fərid', '90'],
            ['Lalə', ''],
            ['Kənan', '95'],
            ['İştirakçı sayı (C6)', '=COUNT(C2:C5)']
          ]
        },
        stepByStep: [
          'C6-ya kliklə.',
          '"=COUNT(C2:C5)" düsturunu yaz.',
          'Enter vurun. Cavab 3 olacaq.'
        ],
        formulaUsed: '=COUNT(C2:C5)',
        resultCell: 'C6',
        resultValue: '3'
      },
      {
        title: 'Nümunə 3: Kitab rəfində neçə kitabın qiyməti var?',
        description: 'Rəfdəki bəzi kitabların qiymətləri yazılıb (D2, D3), bəziləri hədiyyədir və yazısı boşdur (D4). Neçə kitabın qiyməti olduğunu D5-də tapaq.',
        tableData: {
          headers: ['Kitab', 'Qiymət (D2:D4)'],
          rows: [
            ['Kitab 1', '10'],
            ['Kitab 2', '12'],
            ['Kitab 3', ''],
            ['Qiymətli kitablar (D5)', '=COUNT(D2:D4)']
          ]
        },
        stepByStep: [
          'D5 xanasına klikləyin.',
          '"=COUNT(D2:D4)" yazın və Enter düyməsini basın. Nəticə 2 olacaq.'
        ],
        formulaUsed: '=COUNT(D2:D4)',
        resultCell: 'D5',
        resultValue: '2'
      }
    ],
    tasks: [
      {
        id: 1,
        title: 'Tapşırıq 1: Neçə nəfər qiymət aldı?',
        description: 'Şagirdlərdən bəziləri qiymət alıb (B2, B3, B5), biri isə dərsdə olmayıb (B4 xanası boşdur). Qiymət alan şagirdlərin sayını B6 xanasında COUNT düsturu ilə tapın.',
        guideLevel: 'high',
        guideText: 'Addım 1: B6 xanasına klikləyin. Addım 2: "=COUNT(" yazın. Addım 3: B2 xanasından B5-ə qədər siçanla dartıb seçin. Addım 4: ")" yazıb Enter düyməsini sıxın.',
        initialTable: {
          headers: ['Şagird', 'Qiymət (B)'],
          rows: [
            ['Ayşən', '5'],
            ['Emin', '4'],
            ['Samir', ''],
            ['Vüsal', '3'],
            ['Qiymət alan sayı', '']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'B6',
        correctFormulaRegex: '^=COUNT\\(B2:B5\\)$',
        correctValue: '3'
      },
      {
        id: 2,
        title: 'Tapşırıq 2: Neçə oyuncağın qiyməti var?',
        description: 'Oyuncaqlardan bəzilərinin qiyməti var, bəziləri isə hələ satılmır (boşdur). Qiyməti yazılmış oyuncaqların sayını B6 xanasında tapın.',
        guideLevel: 'high',
        guideText: 'B6 xanasına klikləyin, "=COUNT(B2:B5)" yazın və Enter basın. Boş xanaların sayılmadığını görəcəksiniz.',
        initialTable: {
          headers: ['Oyuncaq', 'Qiymət (AZN) (B)'],
          rows: [
            ['Ayı', '15'],
            ['Maşın', ''],
            ['Top', '5'],
            ['Kukla', '20'],
            ['Qiymətli heyvanlar', '']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'B6',
        correctFormulaRegex: '^=COUNT\\(B2:B5\\)$',
        correctValue: '3'
      },
      {
        id: 3,
        title: 'Tapşırıq 3: Neçə gün yağış yağdı?',
        description: 'Yağış yağan günlərdə yağıntının miqdarı B2:B5 xanalarında qeyd edilib, yağmayan günlər isə boş qalıb. Neçə gün yağış yağdığını B6-da tapın.',
        guideLevel: 'high',
        guideText: 'B6-ya "=COUNT(B2:B5)" yazın və Enter düyməsini sıxın.',
        initialTable: {
          headers: ['Gün', 'Yağıntı (mm) (B)'],
          rows: [
            ['Bazar ertəsi', '5'],
            ['Çərşənbə axşamı', ''],
            ['Çərşənbə', ''],
            ['Cümə axşamı', '8'],
            ['Yağışlı gün sayı', '']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'B6',
        correctFormulaRegex: '^=COUNT\\(B2:B5\\)$',
        correctValue: '2'
      },
      {
        id: 4,
        title: 'Tapşırıq 4: Neçə Şagird tapşırıq etdi?',
        description: 'Tapşırığı edən şagirdlərin balları B2:B5 xanalarında yazılıb, etməyənlərin xanası boşdur. Tapşırığı edən şagird sayını B6-da tapın.',
        guideLevel: 'high',
        guideText: 'B6 xanasını seçin, "=COUNT(B2:B5)" daxil edin.',
        initialTable: {
          headers: ['Şagird', 'Bal (B)'],
          rows: [
            ['Zəhra', '100'],
            ['Yusif', ''],
            ['Ləman', '90'],
            ['Ömər', ''],
            ['Edənlərin sayı', '']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'B6',
        correctFormulaRegex: '^=COUNT\\(B2:B5\\)$',
        correctValue: '2'
      },
      {
        id: 5,
        title: 'Tapşırıq 5: Pul yığılan günlər',
        description: 'Aşağıdakı cədvəldə bəzi günlərin yığılan pulu B2:B6 xanalarında göstərilib. Neçə gün pul yığıldığını B7 xanasında hesablayın.',
        guideLevel: 'medium',
        guideText: 'B7 xanasına "=COUNT(B2:B6)" daxil edərək yalnız ədəd daxil edilmiş günlərin sayını tapın.',
        initialTable: {
          headers: ['Gün', 'Yığılan (B)'],
          rows: [
            ['1-ci gün', '10'],
            ['2-ci gün', ''],
            ['3-cü gün', '15'],
            ['4-cü gün', ''],
            ['5-ci gün', '20'],
            ['Cəmi Gün sayı', '']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'B7',
        correctFormulaRegex: '^=COUNT\\(B2:B6\\)$',
        correctValue: '3'
      },
      {
        id: 6,
        title: 'Tapşırıq 6: Zooparkda neçə heyvandan var?',
        description: 'Cədvəldə zooparkda olan heyvanların bəzilərinin sayları B2:B5 xanalarındadır. Heyvan siyahısından neçəsinin sayı məlumdur? B6-da tapın.',
        guideLevel: 'medium',
        guideText: 'B6 xanasını seçib B2-dən B5-ə qədər olan aralıq üçün COUNT düsturunu yazın.',
        initialTable: {
          headers: ['Heyvan', 'Sayı (B)'],
          rows: [
            ['Meymun', '12'],
            ['Timsah', ''],
            ['Zebra', '8'],
            ['Şir', ''],
            ['Say mətni', '']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'B6',
        correctFormulaRegex: '^=COUNT\\(B2:B5\\)$',
        correctValue: '2'
      },
      {
        id: 7,
        title: 'Tapşırıq 7: Kitab rəfi doluluğu',
        description: 'Rəfdəki bəzi bölmələrdəki kitab sayları B2:B5 xanalarında yazılıb. Neçə dolu bölmə olduğunu B6 xanasında tapın.',
        guideLevel: 'medium',
        guideText: 'B6 xanasına keçin və "=COUNT(B2:B5)" yazaraq nəticəni tapın.',
        initialTable: {
          headers: ['Bölmə', 'Kitab Sayı (B)'],
          rows: [
            ['Bölmə 1', '15'],
            ['Bölmə 2', ''],
            ['Bölmə 3', '10'],
            ['Bölmə 4', '5'],
            ['Dolu bölmə sayı', '']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'B6',
        correctFormulaRegex: '^=COUNT\\(B2:B5\\)$',
        correctValue: '3'
      },
      {
        id: 8,
        title: 'Tapşırıq 8: Maşın Satışı',
        description: 'Həftəsonu satılan maşınların sayları B2:B5 xanalarındadır. Neçə gün maşın satışı baş verib? B6-da tapın.',
        guideLevel: 'none',
        guideText: 'Köməksiz, sərbəst şəkildə COUNT düsturunu yazın.',
        initialTable: {
          headers: ['Gün', 'Satış Sayı (B)'],
          rows: [
            ['Şənbə 1', '4'],
            ['Şənbə 2', ''],
            ['Bazar 1', '6'],
            ['Bazar 2', '2'],
            ['Satış olan günlər', '']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'B6',
        correctFormulaRegex: '^=COUNT\\(B2:B5\\)$',
        correctValue: '3'
      },
      {
        id: 9,
        title: 'Tapşırıq 9: Neçə nəfər şahmat oynadı?',
        description: 'Şagirdlərin qazandıqları xallar B2:B6 xanalarındadır. Xalı olan (oynayan) şagirdlərin sayını B7 xanasında hesablayın.',
        guideLevel: 'none',
        guideText: 'Sərbəst şəkildə COUNT düsturunu yazıb cavabı yoxlayın.',
        initialTable: {
          headers: ['Şagird', 'Xallar (B)'],
          rows: [
            ['Nihad', '3'],
            ['Səid', '2'],
            ['Nigar', ''],
            ['Leyla', '4'],
            ['Fərid', ''],
            ['Oynayan sayı', '']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'B7',
        correctFormulaRegex: '^=COUNT\\(B2:B6\\)$',
        correctValue: '3'
      },
      {
        id: 10,
        title: 'Tapşırıq 10: Hansı heyvandan doğuldu?',
        description: 'Yeni doğulan bala heyvanların sayı B2:B6 xanalarındadır. Neçə heyvandan yeni bala doğulduğunu B7-də hesablayın.',
        guideLevel: 'none',
        guideText: 'Artıq COUNT dedektivisən! Düsturu daxil et.',
        initialTable: {
          headers: ['Heyvan', 'Yeni Balalar (B)'],
          rows: [
            ['Keçi', '2'],
            ['İnək', '1'],
            ['Quzu', ''],
            ['At', ''],
            ['Dovşan', '5'],
            ['Doğum sayı', '']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'B7',
        correctFormulaRegex: '^=COUNT\\(B2:B6\\)$',
        correctValue: '3'
      }
    ]
  },
  {
    id: 'autofill',
    title: 'Sürükləmə və Doldurma',
    analogyTitle: 'Sehrli Quyruq',
    analogyContent: 'Təsəvvür et ki, sən bir xanaya "1" yazmısan, növbəti xanalara isə "2, 3, 4, 5..." yazmaq istəyirsən. Hər birini tək-tək yazmaq çox sıxıcıdır, elə deyil? Excel-in buna qarşı çox maraqlı bir gücü var: "Sehrli Quyruq"! Xanaya klikləyəndə, onun sağ alt küncündə balaca bir kvadrat görəcəksən. Həmin kvadratın üstünə siçanı gətirəndə siçan "+" şəklinə düşür. İndi həmin kvadratı basıb aşağıya doğru sürüşdür (sürüklə) və Excel sənin yerinə bütün rəqəmləri ardıcıl yazacaq və ya yazılmış düsturları digər xanalara sürətlə köçürəcək!',
    iconName: 'ChevronDown',
    explanation: 'Sürükləmə ilə doldurma (Autofill) Excel-də eyni məlumatı, ardıcıllığı (məsələn: 1, 2, 3... və ya Yanvar, Fevral...) və ya düsturu qonşu xanalara sürətlə yaymaq üçün istifadə olunur. Bunun üçün xananın sağ alt küncündəki balaca doldurma tutacağından (fill handle) yapışıb sürükləmək lazımdır.',
    isCalculation: false,
    solvedExamples: [
      {
        title: 'Nümunə: Həftənin günləri',
        description: 'A1 xanasına "Bazar ertəsi" yazaraq aşağıya doğru çəkin. Excel digər günləri özü yazacaq.',
        tableData: {
          headers: ['A sütunu'],
          rows: [
            ['Bazar ertəsi'],
            ['Çərşənbə axşamı (sürükləndi)'],
            ['Çərşənbə (sürükləndi)'],
            ['Cümə axşamı (sürükləndi)']
          ]
        },
        stepByStep: [
          'A1 xanasına "Bazar ertəsi" yazın.',
          'Xananı seçin və sağ alt küncdəki kiçik kvadratın üzərinə gəlin.',
          'Sol düyməni basılı saxlayaraq aşağıya A4-ə qədər dartın.',
          'Buraxın və digər günlərin avtomatik yazıldığını görün!'
        ],
        formulaUsed: 'Sürükləmə (Autofill)',
        resultCell: 'A4',
        resultValue: 'Cümə axşamı'
      }
    ],
    tasks: [
      {
        id: 1,
        title: 'Tapşırıq 1: Ardıcıl Rəqəmlər',
        description: 'Excel-də A1 xanasında 1, A2 xanasında 2 yazılıb. Onları birlikdə seçib sağ alt küncdəki kvadratdan tutaraq A5-ə qədər aşağı sürükləyin. Ədədlərin avtomatik artmasını müşahidə edin.',
        guideLevel: 'medium',
        guideText: 'A1:A2 xanalarını birlikdə siçanla seçin. Sonra sağ alt küncdəki doldurma kvadratından tutub A5 xanasına qədər sürüşdürün.',
        initialTable: {
          headers: ['Siyahı (A)'],
          rows: [
            ['1'],
            ['2'],
            [''],
            ['']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'A4',
        correctFormulaRegex: '.*',
        correctValue: '4'
      }
    ]
  },
  {
    id: 'design',
    title: 'Cədvəl Dizaynı',
    analogyTitle: 'Cədvəllərin Rəngarəng Dünyası',
    analogyContent: 'Təsəvvür et ki, sənin ağ-qara rəngli bir otağın var. Ora rəngli xalçalar sərsən, divarları boyasan və əşyaları səliqəyə salsan nə qədər gözəl görünər! Excel-dəki cədvəllər də elədir. Ağ-qara olanda darıxdırıcı görünür. Amma biz başlıq xanalarını rəngləsək, ətraflarına qalın xətlər (sərhədlər) çəksək və yazıları qalın (Bold) etsək, cədvəlimiz canlanar və oxunması çox asan olar!',
    iconName: 'Palette',
    explanation: 'Cədvəli dizayn etmək onu vizual olaraq gözəl etməkdən əlavə, məlumatların daha yaxşı oxunmasına kömək edir. Excel-də biz xanaların arxa fon rəngini (Fill Color), mətn rəngini (Font Color), yazı tipini və sərhədlərini (Borders) dəyişə bilərik.',
    isCalculation: false,
    solvedExamples: [
      {
        title: 'Nümunə: Başlığın dizaynı',
        description: 'A1 və B1 xanalarındakı başlıq mətnini qalın (Bold) etmək və fon rəngini açıq mavi rəngə boyamaq.',
        tableData: {
          headers: ['Meyvə (Qalın + Mavi fon)', 'Sayı (Qalın + Mavi fon)'],
          rows: [['Alma', '12'], ['Armud', '15']]
        },
        stepByStep: [
          'A1 və B1 xanalarını seçin.',
          'Giriş (Home) lentindəki "B" (Bold - Qalın) düyməsini basın.',
          'Yaxınlıqdakı boya vedrəsi (Fill Color) işarəsinə klikləyib açıq mavi rəngi seçin.'
        ],
        formulaUsed: 'Formatlaşdırma',
        resultCell: 'A1',
        resultValue: 'Meyvə'
      }
    ],
    tasks: [
      {
        id: 1,
        title: 'Tapşırıq 1: Sərhədlərin Çəkilməsi',
        description: 'Aşağıdakı cədvəlin bütün ətrafına və xanalarına kənar xətlər (Borders) əlavə edin ki, cədvəl səliqəli görünsün.',
        guideLevel: 'medium',
        guideText: 'Cədvəlin bütün xanalarını seçin (A1-dən B3-ə qədər), sonra dizayn panelindən "Bütün Sərhədlər" (All Borders) düyməsini klikləyin.',
        initialTable: {
          headers: ['Dərs', 'Bal'],
          rows: [
            ['Riyaziyyat', '95'],
            ['Azərbaycan dili', '90']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'A1',
        correctFormulaRegex: '.*',
        correctValue: 'Dərs'
      }
    ]
  },
  {
    id: 'charts',
    title: 'Qrafiklər (Charts)',
    analogyTitle: 'Hündür Qüllələr və Dadlı Pissa',
    analogyContent: 'Əgər sənə desəm ki, "sinifdə 15 oğlan və 10 qız var", bunu ağılda saxlamaq olar. Amma yüzlərlə rəqəm olanda çətinləşir. Bəs bunları qrafiklərlə göstərsək? Sütunlu qrafik (Bar Chart) Lego qüllələrinə bənzəyir - hansı qüllə daha hündürdürsə, deməli ordakı rəqəm daha böyükdür! Dairəvi qrafik (Pie Chart) isə dadlı pizzaya bənzəyir - hansı dostuna pizzadan daha böyük dilim düşürsə, onun payı ən böyükdür!',
    iconName: 'BarChart3',
    explanation: 'Qrafiklər cədvəldəki rəqəmləri şəkil formasında görmək üçün istifadə olunur. Bu, məlumatları saniyələr ərzində analiz etməyə imkan verir. Ən çox istifadə olunan qrafiklər Sütunlu (Bar/Column) və Dairəvi (Pie) qrafiklərdir.',
    isCalculation: false,
    solvedExamples: [
      {
        title: 'Nümunə: Sevimli Meyvələr qrafiki',
        description: 'Meyvə satışının nəticələrinə uyğun olaraq sütunlu qrafik qurmaq.',
        tableData: {
          headers: ['Meyvə', 'Sevənlərin Sayı'],
          rows: [['Alma', '35'], ['Banan', '50'], ['Çiyələk', '45']]
        },
        stepByStep: [
          'Bütün cədvəli başlıqları ilə birlikdə seçin.',
          'Ekranda "Qrafik Yarat" (Create Chart) bölməsindən "Sütunlu Qrafik" (Bar Chart) düyməsini sıxın.',
          'Ekranda avtomatik olaraq rəngli sütunların yarandığını görəcəksiniz.'
        ],
        formulaUsed: 'Qrafik Qurulması',
        resultCell: 'A1',
        resultValue: 'Meyvə'
      }
    ],
    tasks: [
      {
        id: 1,
        title: 'Tapşırıq 1: Oyun xalları qrafiki',
        description: 'Cədvəldəki məlumatlara əsasən bir Sütunlu (Bar) qrafik yaradın ki, kimin daha çox xal topladığı asanlıqla görünsün.',
        guideLevel: 'medium',
        guideText: 'Cədvəli seçin, sonra "Sütunlu Qrafik" düyməsini klikləyərək qrafiki ekrana gətirin.',
        initialTable: {
          headers: ['Ad', 'Xal'],
          rows: [
            ['Əli', '80'],
            ['Ayan', '95'],
            ['Fərid', '60']
          ],
          startCell: 'A1'
        },
        correctFormulaCell: 'A1',
        correctFormulaRegex: '.*',
        correctValue: 'Ad'
      }
    ]
  }
];

export const workbookAnswers = {
  addition: [
    { task: 1, formula: '=A2+B2', value: '12' },
    { task: 2, formula: '=A3+B3', value: '18' },
    { task: 3, formula: '=A4+B4', value: '7' },
    { task: 4, formula: '=A5+B5', value: '25' },
    { task: 5, formula: '=A6+B6', value: '80' },
    { task: 6, formula: '=A7+B7', value: '40' },
    { task: 7, formula: '=A8+B8', value: '30' },
    { task: 8, formula: '=A9+B9', value: '30' },
    { task: 9, formula: '=A10+B10', value: '85' },
    { task: 10, formula: '=A11+B11', value: '400' }
  ],
  sum: [
    { task: 1, formula: '=SUM(B2:B4)', value: '33' },
    { task: 2, formula: '=SUM(B2:B5)', value: '33' },
    { task: 3, formula: '=SUM(B2:B5)', value: '10' },
    { task: 4, formula: '=SUM(B2:B5)', value: '30' },
    { task: 5, formula: '=SUM(B2:B6)', value: '130' },
    { task: 6, formula: '=SUM(B2:B5)', value: '40' },
    { task: 7, formula: '=SUM(B2:B5)', value: '62' },
    { task: 8, formula: '=SUM(B2:B5)', value: '170' },
    { task: 9, formula: '=SUM(B2:B6)', value: '26' },
    { task: 10, formula: '=SUM(B2:B6)', value: '35' }
  ],
  average: [
    { task: 1, formula: '=AVERAGE(B2:B4)', value: '80' },
    { task: 2, formula: '=AVERAGE(B2:B4)', value: '200' },
    { task: 3, formula: '=AVERAGE(B2:B4)', value: '8' },
    { task: 4, formula: '=AVERAGE(B2:B5)', value: '20' },
    { task: 5, formula: '=AVERAGE(B2:B5)', value: '10' },
    { task: 6, formula: '=AVERAGE(B2:B5)', value: '110' },
    { task: 7, formula: '=AVERAGE(B2:B5)', value: '16' },
    { task: 8, formula: '=AVERAGE(B2:B5)', value: '4' },
    { task: 9, formula: '=AVERAGE(B2:B6)', value: '20' },
    { task: 10, formula: '=AVERAGE(B2:B6)', value: '10' }
  ],
  count: [
    { task: 1, formula: '=COUNT(B2:B5)', value: '3' },
    { task: 2, formula: '=COUNT(B2:B5)', value: '3' },
    { task: 3, formula: '=COUNT(B2:B5)', value: '2' },
    { task: 4, formula: '=COUNT(B2:B5)', value: '2' },
    { task: 5, formula: '=COUNT(B2:B6)', value: '3' },
    { task: 6, formula: '=COUNT(B2:B5)', value: '2' },
    { task: 7, formula: '=COUNT(B2:B5)', value: '3' },
    { task: 8, formula: '=COUNT(B2:B5)', value: '3' },
    { task: 9, formula: '=COUNT(B2:B6)', value: '3' },
    { task: 10, formula: '=COUNT(B2:B6)', value: '3' }
  ]
};
