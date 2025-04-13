from sqlalchemy import Column, Integer, String
from db.database import Base

class Clinica(Base):
    __tablename__ = 'clinicas'

    id = Column(Integer, primary_key=True)
    nome = Column(String, nullable=False)
    especialidade = Column(String)
    endereco = Column(String)
    url_imagem = Column(String)
    link_whatsapp = Column(String)

    def to_dict(self):
        return {
            "id": self.id,
            "nome":self.nome,
            "especialidade":self.especialidade,
            "endereco":self.endereco,
            "url_imagem":self.url_imagem,
            "link_whatsapp":self.link_whatsapp
        }