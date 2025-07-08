export interface DirectoryReport {
  files: number;                         // загальна кількість знайдених файлів
  directories: number;                   // кількість вкладених директорій
  totalSize: number;                     // загальний розмір файлів у байтах
  extensions: Record<string, number>;   // статистика: кількість файлів за розширенням
}