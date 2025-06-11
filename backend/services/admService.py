from models.admModel import Adm
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
from db.database import SessionLocal

class AdmService():
  def update_adm(adm_id, data):
    with SessionLocal() as db:
        adm = db.query(Adm).get(adm_id)
        for key, value in data.items():
            setattr(adm, key, value)
        db.commit()
        db.refresh(adm) 
        return adm.to_dict()  
    
  def get_all_adm():
      with SessionLocal() as db:
          return db.query(Adm).all()

  def get_adm_by_id(adm_id):
      with SessionLocal() as db:
          return db.query(Adm).get(adm_id)

  def create_adm(data):
      hashed_password = generate_password_hash(data['password'])
      data['password'] = hashed_password
      with SessionLocal() as db:
          novo = Adm(**data)
          db.add(novo)
          db.commit()
          db.refresh(novo)
          return novo

  def delete_adm(adm_id):
      with SessionLocal() as db:
          adm = db.query(Adm).get(adm_id)
          db.delete(adm)
          db.commit()

  def authentication(user, password):
      with SessionLocal() as db:
          adm = db.query(Adm).filter_by(user=user).first()
          if adm and check_password_hash(adm.password, password):
              return True
          return None
      
    

