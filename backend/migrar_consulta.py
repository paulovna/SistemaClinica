
import os
import sqlite3

# Caminho absoluto para o banco na pasta atual (onde está este script)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(BASE_DIR, "clinica.db")

# Conectar ao banco
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Executar migrações
try:
    cursor.execute("ALTER TABLE consultas ADD COLUMN paciente_nome TEXT;")
    cursor.execute("ALTER TABLE consultas ADD COLUMN telefone TEXT;")
    cursor.execute("ALTER TABLE consultas ADD COLUMN especialidade TEXT;")
    conn.commit()
    print("✅ Migração concluída com sucesso.")
except sqlite3.OperationalError as e:
    print("⚠️ Já migrado ou erro:", e)

conn.close()
