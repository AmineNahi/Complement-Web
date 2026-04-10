# Complement-Web

python3 -c "import ssl, http.server; ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER); ctx.load_cert_chain('../../../../cert/cert.pem', '../../../../cert/key.pem'); server = http.server.HTTPServer(('localhost', 8443), http.server.SimpleHTTPRequestHandler); server.socket = ctx.wrap_socket(server.socket); print('Serveur lancé sur https://localhost:8443'); server.serve_forever()"