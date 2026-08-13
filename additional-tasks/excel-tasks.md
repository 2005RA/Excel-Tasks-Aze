# EXCEL TAPŞIRIQLARI (100 bal)

**Formullar, Diaqramlar və Pivot Cədvəllər üzrə praktiki tapşırıqlar**

Aşağıdakı cədvəllərdə bir neçə nümunə sətir verilmişdir. Qalan sətirləri özünüz uyğun məlumatlarla doldurun. Tapşırıqları ardıcıllıqla, ipucu və cavab olmadan sərbəst şəkildə yerinə yetirin.

---

## Cədvəl 1 — Satış Cədvəli

Cədvəli aşağıdakı sütun adları ilə qurun və nümunə sətirlərdən sonra özünüz ən azı 25 sətrə qədər davam etdirin.

| № | Məhsul | Kateqoriya | Say | Vahid Qiymət (AZN) | Endirim (%) | Region | Satıcı | Tarix |
|---|---|---|---|---|---|---|---|---|
| 1 | Noutbuk | Elektronika | 3 | 1200 | 10 | Bakı | Rəşad | 03.01.2026 |
| 2 | Telefon | Elektronika | 5 | 800 | 5 | Gəncə | Aynur | 05.01.2026 |
| 3 | Yazı Stolu | Mebel | 10 | 150 | 0 | Sumqayıt | Elvin | 07.01.2026 |
| 4 | Kitab | Kargüzarlıq | 20 | 12 | 15 | Bakı | Rəşad | 10.01.2026 |
| 5 | Stul | Mebel | 8 | 90 | 5 | Gəncə | Aynur | 12.01.2026 |
|   |   |   |   |   |   |   |   |   |
|   |   |   |   |   |   |   |   |   |
|   |   |   |   |   |   |   |   |   |
|   |   |   |   |   |   |   |   |   |
|   |   |   |   |   |   |   |   |   |

### Cədvəl 1 üzrə tapşırıqlar

!!! Başlığı olmayan tək xanalı hesablamaların qarşısında (əlavə bir xanada) nəyi hesabladığınızı izah edin ki, yoxlamaya prosesində qarışıqlıq yaranmasın.
!!! Excel faylını mümkün qədər səliqəli saxlayın.
!!! Hər bir cədvəl üçün bir Sheet yaradın (Excel-də lap aşağıdakı + işarəsi ilə yeni Sheet (vərəq) əlavə edə bilərsiz).

1. Cədvəl 1-də “Ümumi Məbləğ” adlı yeni sütun yaradın və Say ilə Vahid Qiyməti vuraraq hesablayın.
2. Say 10-dan çox olan sətirlərdə “Böyük Sifariş”, əks halda “Kiçik Sifariş” yazan yeni sütun yaradın.
3. Yekun Qiymət sütununun ümumi cəmini tapın.
4. Kateqoriyası “Elektronika” olan neçə məhsul olduğunu tapın.
5. “Endirim Məbləği” adlı sütun yaradın: Ümumi Məbləği Endirim ilə vurun.
6. Cədvəl 1-dən istifadə edərək Pivot Cədvəl yaradın: Sətirlərə Kateqoriya, Dəyərlərə Yekun Qiymətin cəmini yerləşdirin.
7. Ən baha Vahid Qiyməti tapın.
8. Endirim 10-dan böyükdürsə “Yüksək Endirim”, əks halda “Aşağı Endirim” yazın.
9. “Bakı” regionunda neçə satış olduğunu hesablayın.
10. “Yekun Qiymət” adlı sütun yaradın: Ümumi Məbləğdən Endirim Məbləğini çıxarın.
11. Region üzrə satışların nisbətini göstərən Dairə Diaqramı qurun.
12. Vahid Qiymətin orta dəyərini hesablayın.
13. Hər məhsulun bir ədədinin son qiymətini tapmaq üçün Yekun Qiyməti Say-a bölün.
14. Vahid Qiymət 500-dən çoxdursa “Bahalı”, əks halda “Ucuz” yazan sütun düzəldin.
15. Say sütununda neçə ədəd dəyər olduğunu hesablayın.
16. Cədvəl 1-də Region sütununa görə filtr tətbiq edərək yalnız “Bakı” sətirlərini göstərin.
17. İlk beş sətrin Say dəyərlərini bir xanada cəmləyin.
18. Region “Bakı” olduqda “Paytaxt”, əks halda “Region” yazın.
19. “Mebel” kateqoriyasındakı məhsulların orta Vahid Qiymətini tapın.
20. Say sütununun cəmini tapın.
21. Cədvəl 1-i Excel Cədvəl formatına çevirin.
22. Yekun Qiymət 1000-dən böyükdürsə “VIP Sifariş”, əks halda xananı boş buraxın.
23. Ən böyük Yekun Qiyməti tapın.
24. Say sütununda 10-dan çox olan sətirlərin sayını tapın.
25. Vahid Qiymət sütununu 2 ilə vurub nəticəni yeni sütunda göstərin.
26. Cədvəl 1-dəki Kateqoriya üzrə ümumi Yekun Qiyməti göstərən Sütun Diaqramı qurun.
27. Kateqoriya “Elektronika” olduqda “Zəmanətli”, əks halda “Zəmanətsiz” yazın.
28. “Rəşad” satıcısının neçə satışı olduğunu hesablayın.
29. Endirim sütununun orta dəyərini tapın.
30. Ümumi Məbləğ sütununu 100-ə bölərək nəticəni ayrıca sütunda göstərin.
31. Eyni Pivot Cədvəldə Dəyər sahəsini Cəm əvəzinə Say göstərəcək şəkildə dəyişin.
32. Say 5-dən azdırsa “Stokda Az”, əks halda “Stokda Kifayət qədər” yazın.
33. Vahid Qiyməti 100-dən az olan məhsulların sayını tapın.
34. Tarix üzrə satışların dəyişməsini göstərən Xətt Diaqramı qurun.
35. Ən ucuz Vahid Qiyməti tapın.
36. Say sütunundakı bütün dəyərləri toplayaraq ümumi say tapın.
37. Filtri ləğv edib, Say sütununa görə filtr tətbiq edərək dəyəri 10-dan çox olan sətirləri göstərin.
38. “Gəncə” regionundakı satışların orta Yekun Qiymətini hesablayın.
39. Pivot Cədvəldə Dəyər sahəsini Orta göstərəcək şəkildə dəyişin.
40. Satıcının adı “Rəşad” olduqda “Rəşadın satışı”, əks halda “Digər satıcı” yazın.
41. Kateqoriya sütununda “Kargüzarlıq” olan sətirlərin sayını ayrıca xanada göstərin.
42. Satıcı üzrə ümumi Yekun Qiyməti göstərən başqa bir Sütun Diaqramı qurun.
43. Ən kiçik Say dəyərini tapın.
44. Cədvəl 1-də təkrarlanan sətirləri yoxlamaq üçün dublikatları silin.
45. Yekun Qiyməti 1000-dən çox olan sətirləri rəngləyin.
46. Cədvəl 1-də “Region” sütununa yalnız Bakı, Gəncə, Sumqayıt daxil edilməsini məhdudlaşdırın.
47. Pivot Cədvəldə Sütunlara Region əlavə edərək Kateqoriya və Region üzrə çarpaz cədvəl yaradın.
48. Yaratdığınız diaqramlardan birinə başlıq və ox adları əlavə edin.
49. Pivot Cədvəldə Filtr sahəsinə Satıcı əlavə edin və yalnız bir satıcının məlumatlarını göstərin.
50. Dairə Diaqramında hər dilimin faiz dəyərini göstərin.
51. Pivot Cədvəldə Dəyər sahəsini Maksimum göstərəcək şəkildə dəyişərək hər Kateqoriyada ən yüksək Yekun Qiyməti tapın.
52. Yekun Qiymət ilə Endirim Məbləğini toplayaraq yenidən Ümumi Məbləği alıb-almadığınızı yoxlayın.
53. Pivot Cədvəldə Dəyər sahəsini Minimum göstərəcək şəkildə dəyişərək hər Kateqoriyada ən aşağı Yekun Qiyməti tapın.
54. “Aynur” satıcısının orta Ümumi Məbləğini hesablayın.
55. Kateqoriya üzrə Yekun Qiymətin cəmini göstərən Pivot Cədvəldən istifadə edərək Sütun Diaqramı yaradın.
56. Vahid Qiymət sütununda neçə rəqəm daxil edildiyini tapın.
57. Say-ı 5-dən çox olan sətirlərin orta Endirim dəyərini tapın.
58. İki istənilən Vahid Qiymət xanasının fərqini tapın.

---

## Cədvəl 2 — İşçi Məlumatları

Nümunə sətirlərdən sonra cədvəli özünüz ən azı 20 sətrə qədər davam etdirin.

| İşçi ID | Ad Soyad | Şöbə | Vəzifə | Aylıq Maaş (AZN) | İşə Başlama Tarixi |
|---|---|---|---|---|---|
| 101 | Kamran Əliyev | Maliyyə | Mühasib | 900 | 01.02.2022 |
| 102 | Nərmin Hüseynova | IT | Proqramçı | 1500 | 15.03.2021 |
| 103 | Tural Məmmədov | Satış | Menecer | 1100 | 10.06.2023 |
| 104 | Günel Rzayeva | HR | Mütəxəssis | 800 | 05.09.2022 |
| 105 | Elşən Quliyev | IT | Analitik | 1300 | 20.01.2024 |
|   |   |   |   |   |   |
|   |   |   |   |   |   |
|   |   |   |   |   |   |
|   |   |   |   |   |   |
|   |   |   |   |   |   |

### Cədvəl 2 üzrə tapşırıqlar

59. Cədvəl 2-də Ad Soyad sütununu Ad və Soyad kimi iki ayrı sütuna bölün.
60. Cədvəl 2-dəki Şöbə üzrə orta Aylıq Maaşı göstərən Sütun Diaqramı qurun.
61. Cədvəl 2-dəki İşə Başlama Tarixinə görə işçi sayının dəyişməsini göstərən Xətt Diaqramı qurun.
62. Cədvəl 2-dən istifadə edərək Şöbə üzrə orta Aylıq Maaşı göstərən yeni Pivot Cədvəl yaradın.
63. Yuxarıdakı Pivot Cədvələ Şöbə üzrə işçi sayını göstərən ikinci dəyər sahəsi əlavə edin.
64. Cədvəl 2-də “Aylıq Maaş” sütununa yalnız 500 ilə 3000 arasındakı rəqəmlərin yazılmasını məhdudlaşdırın.
65. Ən yüksək Aylıq Maaşa uyğun Ad Soyadı tapın.

---

## Cədvəl 3 — Axtarış Cədvəli

Bu cədvəldəki “Tapılan...” sütunlarını Cədvəl 2-dəki məlumatlara əsasən doldurun. Sonuncu sətirdə olmayan bir ID yazıb “tapılmadı” halını da yoxlayın.

| Axtarılan İşçi ID | Tapılan Ad Soyad | Tapılan Şöbə | Tapılan Maaş |
|---|---|---|---|
| 102 |   |   |   |
| 104 |   |   |   |
| 999 |   |   |   |
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |
|   |   |   |   |

### Cədvəl 3 üzrə tapşırıqlar

66. Cədvəl 3-dəki hər İşçi ID-yə uyğun Ad Soyadı Cədvəl 2-dən tapıb “Tapılan Ad Soyad” sütununa yazın.
67. Uyğun Şöbəni tapıb “Tapılan Şöbə” sütununa yazın.
68. Uyğun Aylıq Maaşı tapıb “Tapılan Maaş” sütununa yazın.
69. Cədvəl 3-də olmayan İşçi ID üçün “Tapılmadı” mesajı göstərin.
70. Cədvəl 3-dəki hər İşçi ID üçün Vəzifə tapıb yeni sütun əlavə edin.
71. Cədvəl 3-də istənilən İşçi ID daxil edərək uyğun İşə Başlama Tarixini tapın.
72. Ad Soyada görə axtarış edib həmin işçinin Şöbəsini tapan ayrıca nəticə göstərin.

---

## Çoxseçimli suallar

Hər sual üçün yalnız bir düzgün variantı seçin. Excel-də Text Box əlavə edərək sual nömrələrini və cavablarını daxil edin.

73. XLOOKUP funksiyasının əsas quruluşu hansıdır?

A) =XLOOKUP(axtarılan_qiymət, axtarılan_massiv, qaytarılan_massiv)  
B) =LOOKUP(axtarılan_qiymət)  
C) =VLOOKUP(axtarılan_massiv, axtarılan_qiymət)  
D) =XLOOKUP(qaytarılan_massiv, axtarılan_qiymət)

74. COUNTIF funksiyası nə üçün istifadə olunur?

A) Şərtə uyğun xanaların sayını hesablamaq üçün  
B) Şərtə uyğun xanaların cəmini tapmaq üçün  
C) Xanaların orta qiymətini tapmaq üçün  
D) Ən böyük qiyməti tapmaq üçün

75. AVERAGEIF funksiyası minimum neçə əsas arqument tələb edir?

A) 1  
B) 2  
C) 3  
D) 4

76. Pivot Cədvəldə “Dəyərlər” sahəsinə mətn sütunu yerləşdirildikdə defolt olaraq hansı funksiya tətbiq olunur?

A) Sum  
B) Count  
C) Average  
D) Max

77. Aşağıdakılardan hansı Dairə Diaqramı üçün ən uyğun məlumat növüdür?

A) Zaman ərzində davamlı dəyişən məlumat  
B) Bir bütövün hissələrini göstərən məlumat  
C) İki dəyişən arasında korrelyasiya  
D) Coğrafi koordinatlar

78. IF funksiyasının düzgün sintaksisi hansıdır?

A) =IF(şərt, doğrudursa_nəticə, yanlışdırsa_nəticə)  
B) =IF(nəticə, şərt)  
C) =IF(doğrudursa, yanlışdırsa)  
D) =IF(şərt; şərt2)

79. Silinmiş sual

80. İki sütunu birləşdirmək üçün hansı alətdən istifadə olunur?

A) Merge Cells  
B) Text to Columns  
C) Remove Duplicates  
D) Conditional Formatting

81. Silinmiş sual
82. 
83. "=A1*B1-C1" düsturunda əməliyyatların ardıcıllığı necədir?

A) Əvvəlcə çıxma, sonra vurma  
B) Əvvəlcə vurma, sonra çıxma  
C) Sıra fərq etmir  
D) Excel xəta verəcək

83. Pivot Cədvəldən diaqram yaratmaq üçün hansı əmrdən istifadə olunur?

A) Pivot Chart  
B) SmartArt  
C) Sort  
D) Insert Function
