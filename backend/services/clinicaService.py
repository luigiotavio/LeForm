from models.clinicaModel import Clinica
from db.database import SessionLocal
from collections import Counter

class ClinicaService():
  def update_clinica(clinica_id, data):
    with SessionLocal() as db:
        clinica = db.query(Clinica).get(clinica_id)
        for key, value in data.items():
            setattr(clinica, key, value)
        db.commit()
        db.refresh(clinica) 
        return clinica.to_dict()  
    
  def get_all_clinicas():
      with SessionLocal() as db:
          return db.query(Clinica).all()

  def get_clinica_by_id(clinica_id):
      with SessionLocal() as db:
          return db.query(Clinica).get(clinica_id)

  def create_clinica(data):
      with SessionLocal() as db:
          novo = Clinica(**data)
          db.add(novo)
          db.commit()
          db.refresh(novo)
          return novo

  def delete_clinica(clinica_id):
      with SessionLocal() as db:
          clinica = db.query(Clinica).get(clinica_id)
          db.delete(clinica)
          db.commit()
          
#   def get_filtros():
#         with SessionLocal() as db:
#             clinicas = db.query(Clinica).all()

#         # Localizações mais frequentes
#         enderecos = [c.endereco for c in clinicas if c.endereco]
#         # Especialidades (pode chamar de serviços ou categorias)
#         especialidades = [c.especialidade for c in clinicas if c.especialidade]

#         def top_freq(lst):
#             counter = Counter(lst)
#             return [
#                 {"valor": v, "contar": counter[v]}
#                 for v, _ in counter.most_common()
#             ]

#         return {
#             "location": top_freq(enderecos),
#             "services": top_freq(especialidades),
#             "categories": top_freq(especialidades),  # Troque aqui se quiser outra lógica para categorias
#         }