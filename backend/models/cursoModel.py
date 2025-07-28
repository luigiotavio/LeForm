from sqlalchemy import Column, Integer, String, Float
from db.database import Base

class Curso(Base):
    __tablename__ = 'cursos'

    id = Column(Integer, primary_key=True)
    nome = Column(String, nullable=False)
    doutor = Column(String, nullable=False)
    preco = Column(Float)
    atividades = Column(String)
    especializacao = Column(String, nullable=False)
    link = Column(String)
    url_imagem = Column(String)
    ler_mais = Column(String, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "doutor":self.doutor,
            "preco":self.preco,
            "atividades":self.atividades,
            "especializacao":self.especializacao,
            "link":self.link,
            "url_imagem":self.url_imagem,
            "ler_mais":self.ler_mais
        }