from sqlalchemy import Column, Integer, String, Float
from db.database import Base

class Curso(Base):
    __tablename__ = 'cursos'

    id = Column(Integer, primary_key=True)
    nome = Column(String, nullable=False)
    doutor = Column(String, nullable=False)
    preco = Column(Float)
    atividades = Column(String)
    especializacao = Column(String)
    link = Column(String)
    url_imagem = Column(String)
