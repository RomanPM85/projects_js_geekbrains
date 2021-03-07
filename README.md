### Geekbrains Advanced Javascript Course

#### Lesson 1

Практическое задание:

1. Добавьте стили для верхнего меню, товара, списка товаров и кнопки вызова корзины.
2. Добавьте значения по умолчанию для аргументов функции. Как можно упростить или сократить запись функций? 3.* Сейчас
   после каждого товара на странице выводится запятая. Из-за чего это происходит? Как это исправить?

1.1 Добавлены простые стили для header с корзиной, добавлен flex box для товаров. 2.1 Добавлены значения по умолчанию к
аргументам title, price, photo products в случае отсутствия товара, выводящую информация об отсутствии товара, цену и
фото об отсутствии. 3.1 js неявный приводит массив к строке (и использует запятую в качестве разделителя по умолчанию).
Таким образом, вы можете объяснить массив приведения в строку перед установкой innerHTML, добавив join(''):

#### Array.prototype.toString():

Description The Array object overrides the toString method of Object. For Array objects, the toString method joins the
array and returns one string containing each array element separated by commas.

JavaScript calls the toString method automatically when an array is to be represented as a text value or when an array
is referred to in a string concatenation.

#### Array.prototype.join():

The join() method creates and returns a new string by concatenating all of the elements in an array (or an array-like
object), separated by commas or a specified separator string. If the array has only one item, then that item will be
returned without using the separator.

#### Lesson 2

1. Добавьте пустые классы для корзины товаров и элемента корзины товаров. Продумайте, какие методы понадобятся для
   работы с этими сущностями.
2. Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.
3. *Некая сеть фастфуда предлагает несколько видов гамбургеров:
   Маленький (50 рублей, 20 калорий). Большой (100 рублей, 40 калорий). Гамбургер может быть с одним из нескольких видов
   начинок (обязательно):
   С сыром (+10 рублей, +20 калорий). С салатом (+20 рублей, +5 калорий). С картофелем (+15 рублей, +10 калорий).
   Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и полить майонезом (+20 рублей, +5 калорий)
   . 3Напишите программу, рассчитывающую стоимость и калорийность гамбургера. Можно использовать примерную архитектуру
   класса из методички, но можно использовать и свою.

