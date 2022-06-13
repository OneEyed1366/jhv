/**
 * Хук для трансфрмирования текста к виду "Заголовок"
 *
 * @param {string} data Строка, которая будет трансформирована
 *
 * @return {string} Трансформированную строку
 * */
export default function useUpperCase(data: string): string {
  return [...data].reduce((acc, curr, i) => {
    if (i === 0) {
      return acc + curr.toUpperCase();
    }

    return acc + curr;
  }, "");
}
