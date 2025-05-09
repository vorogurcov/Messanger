export function formatDateToDMYLocal(isoString: string): string {
    const date = new Date(isoString);
    
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
  
    return `${day}.${month}.${year}`;
}

export function isNextDay(firstDateStr: string, secondDateStr: string): boolean {
    // Парсим даты
    const firstDate = new Date(firstDateStr);
    const secondDate = new Date(secondDateStr);
  
    // Проверяем валидность дат
    if (isNaN(firstDate.getTime()) || isNaN(secondDate.getTime())) {
      throw new Error('Invalid date format');
    }
  
    // Нормализуем даты (сбрасываем часы/минуты)
    const firstDay = new Date(
      firstDate.getFullYear(),
      firstDate.getMonth(),
      firstDate.getDate()
    );
    
    const secondDay = new Date(
      secondDate.getFullYear(),
      secondDate.getMonth(),
      secondDate.getDate()
    );
  
    // Разница в миллисекундах
    const timeDiff = secondDay.getTime() - firstDay.getTime();
    
    // Проверяем, что разница ровно 1 день (86400000 мс)
    return timeDiff === 86400000;
}
