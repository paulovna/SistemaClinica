import requests

resp = requests.post("http://localhost:8000/whatsapp/simular", json={
    "telefone": "11999999999",
    "mensagem": "marcar"
})

print(resp.json())
