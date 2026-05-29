#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Скрипт для заполнения БД тестовыми товарами.
Запуск: python seed_db.py
"""

import asyncio
from pathlib import Path
import aiosqlite

# Путь к БД — такой же, как в твоем DatabaseManager
DB_PATH = Path(__file__).parent / "db" / "db.db"

# Товары: цена — целое число (в копейках/рублях), без форматирования
PRODUCTS = [
    (1, "Раковина Oval", "Керамическая раковина", 10000),
    (2, "Смеситель Grohe", "Хромированный", 12500),
    (3, "Ванна Akvatek", "Акриловая 170x70", 25000),
    (4, "Унитаз Roca", "Напольный с бачком", 18900),
    (5, "Душевая кабина", "90x90 см", 32000),
    (6, "Зеркало с подсветкой", "80x60 см", 15500),
    (7, "Полотенцесушитель", "Электрический", 8900),
    (8, "Сифон для раковины", "Хром", 1200),
    (9, "Инсталляция Geberit", "Для унитаза", 14000),
    (10, "Душевой поддон", "120x80 см", 9500),
    (11, "Смеситель для ванны", "С душем", 7800),
    (12, "Шкафчик для ванной", "Подвесной", 11200),
    (13, "Мыльница", "Керамическая", 890),
    (14, "Держатель для полотенец", "Нержавеющая сталь", 2100),
    (15, "Полка угловая", "Стекло", 3400),
    (16, "Комплект аксессуаров", "5 предметов", 5600),
]

    
async def seed():
    # Создаём папку db, если нет
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    
    async with aiosqlite.connect(DB_PATH) as conn:
        # Создаём таблицу, если не существует
        await conn.execute("""
            CREATE TABLE IF NOT EXISTS goods (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                description TEXT NOT NULL,
                price INTEGER NOT NULL
            )
        """)
        
        # Проверяем, есть ли уже данные
        cursor = await conn.execute("SELECT COUNT(*) FROM goods")
        count = (await cursor.fetchone())[0]
        
        if count > 0:
            print(f"⚠️ В таблице goods уже есть {count} записей. Пропускаем заполнение.")
            return
        
        # Вставляем товары
        await conn.executemany(
            "INSERT INTO goods (id, name, description, price) VALUES (?, ?, ?, ?)",
            PRODUCTS
        )
        await conn.commit()
        print(f"✅ Успешно добавлено {len(PRODUCTS)} товаров в БД: {DB_PATH}")


if __name__ == "__main__":
    asyncio.run(seed())