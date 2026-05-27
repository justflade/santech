import aiosqlite
from typing import Optional, List, Dict, Any

DB_PATH = "db\\database.db"


class DatabaseManager:
    def __init__(self, db_path: str = DB_PATH):
        self.db_path = db_path
        self._connection = None

    async def connect(self):
        self._connection = await aiosqlite.connect(self.db_path)
        self._connection.row_factory = aiosqlite.Row

    async def close(self):
        if self._connection:
            await self._connection.close()

    async def execute(
        self, query: str, parameters: Optional[tuple] = None, commit: bool = False
    ) -> Optional[aiosqlite.Cursor]:
        cursor = await self._connection.cursor()
        if parameters:
            await cursor.execute(query, parameters)
        else:
            await cursor.execute(query)
        if commit:
            await self._connection.commit()
        return cursor

    async def fetch_one(
        self, query: str, parameters: Optional[tuple] = None
    ) -> Optional[Dict[str, Any]]:
        cursor = await self.execute(query, parameters)
        result = await cursor.fetchone()
        await cursor.close()
        return dict(result) if result else None

    async def fetch_all(
        self, query: str, parameters: Optional[tuple] = None
    ) -> List[Dict[str, Any]]:
        cursor = await self.execute(query, parameters)
        results = await cursor.fetchall()
        await cursor.close()
        return [dict(row) for row in results]

    async def execute_many(
        self, query: str, parameters_list: List[tuple], commit: bool = True
    ):
        cursor = await self._connection.cursor()
        await cursor.executemany(query, parameters_list)
        if commit:
            await self._connection.commit()
        await cursor.close()

    async def insert(self, query: str, parameters: tuple) -> int:
        cursor = await self.execute(query, parameters, commit=True)
        last_row_id = cursor.lastrowid
        await cursor.close()
        return last_row_id

    async def create_table(self, table_sql: str):
        await self.execute(table_sql, commit=True)
