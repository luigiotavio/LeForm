from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from db.database import Base

class Adm(Base):
    __tablename__ = 'adm'

    id = Column(Integer, primary_key=True)
    user = Column("user", String, nullable=False, unique=True, key="username")
    password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.now)
    

    def to_dict(self):
        return {
            "id": self.id,
            "user":self.user,
            "password":self.password,
            "created_at":self.created_at
        }