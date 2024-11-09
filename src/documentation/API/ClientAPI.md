# Documentação API OdontoSoft - Módulo Cliente

Documentação especifica para verificação, criação, atribuição e atualizaçao de dados e controle de Pacientes e seus procedimentos

Pode ser visualizado no [<img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/refs/heads/6.x/svgs/brands/square-github.svg" height="12">
Repositorio Github/Documentação de API Cliente](https://github.com/Gabuito/OdontoCare/tree/master/src/documentation/ClientAPI.md)

ou pelo URL do sistema em [✨ /v1/docs/APIClient](http://localhost:5000/v1/docs/APIClient)

## Padrões de Resposta

Foram criados padrões que buscam atender (ou pelos alguns) os principios **REST**, ou seja, 

- Interface Uniforme: Define a interface entre cliente e servidor, simplificando e desacoplando a arquitetura. Centraliza em torno do recurso (ex: cliente, procedimento, estoque).

- Stateless (Sem Estado): Cada requisição do cliente contém todas as informações necessárias para o servidor processá-la. O servidor não armazena informações sobre o estado do cliente entre requisições.

- Cacheable: As respostas do servidor devem indicar se podem ser armazenadas em cache do cliente, para melhorar o desempenho.

- Sistema em Camadas: A arquitetura MVC monolitica é adaptada em varias camadas (API Gateway, HTTP server e etc...), sem que o cliente precise saber disso.

- Client-Server: Separação clara entre cliente (interface do usuário) e servidor (lógica de negócios e dados), permitindo a independencia.

Esta documentação é sobre **iteração Cliente** da API.

Todas as respostas seguem o padrão abaixo:

### Sucesso
```javascript
{
  "success": true,
  "data": {
    // dados da resposta
  },
  "timestamp": "2024-11-09T10:00:00Z"
}
```

### Erro
```javascript
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Mensagem descritiva do erro",
    "details": {} // Detalhes adicionais quando aplicável
  },
  "timestamp": "2024-11-09T10:00:00Z"
}
```

## Endpoints

### 1. Listar Usuários
```http
GET /v1/users
```

**Permissões:** `read_users_any`

#### ✅ Caso Válido
**Request**
```http
GET /v1/users
Authorization: Bearer {token-admin}
```

**Response** (200 OK)
```javascript
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "123",
        "name": "Dr. João Silva",
        "type": "dentist",
        "specialties": ["orthodontics"],
        "createdAt": "2024-11-09T10:00:00Z"
      }
    ],
    "pagination": {
      "total": 50,
      "page": 1,
      "limit": 10
    }
  },
  "timestamp": "2024-11-09T10:00:00Z"
}
```

#### ❌ Caso Inválido
**Request**
```http
GET /v1/users
Authorization: Bearer {token-dentista}
```

**Response** (403 Forbidden)
```javascript
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "Usuário não possui permissão para listar todos os usuários"
  },
  "timestamp": "2024-11-09T10:00:00Z"
}
```

### 2. Buscar Usuário por ID
```http
GET /v1/users/:id
```

**Permissões:** `read_users_any` OU `read_users_own`

#### ✅ Caso Válido
**Request**
```http
GET /v1/users/123
Authorization: Bearer {token-usuario-123}
```

**Response** (200 OK)
```javascript
{
  "success": true,
  "data": {
    "id": "123",
    "name": "Dr. João Silva",
    "email": "joao.silva@clinica.com",
    "type": "dentist",
    "specialties": ["orthodontics"],
    "createdAt": "2024-11-09T10:00:00Z",
    "updatedAt": "2024-11-09T10:00:00Z"
  },
  "timestamp": "2024-11-09T10:00:00Z"
}
```

#### ❌ Caso Inválido
**Request**
```http
GET /v1/users/456
Authorization: Bearer {token-usuario-123}
```

**Response** (403 Forbidden)
```javascript
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED_ACCESS",
    "message": "Usuário não possui permissão para acessar este perfil"
  },
  "timestamp": "2024-11-09T10:00:00Z"
}
```

### 3. Criar Protocolo para Paciente
```http
POST /v1/users/:id/protocols/create
```

**Permissões:** `create_protocols_any` OU `create_protocols_own`

#### ✅ Caso Válido - Encaminhamento
**Request**
```http
POST /v1/users/456/protocols/create
Authorization: Bearer {token-dentista-123}
Content-Type: application/json

{
  "assignedDentistId": "789",
  "procedureType": "SURGERY",
  "priority": "normal",
  "description": "Extração de siso com complicação",
  "encaminhamento": {
    "fromDentistId": "123",
    "reason": "Necessidade de avaliação cirúrgica"
  }
}
```

**Response** (201 Created)
```javascript
{
  "success": true,
  "data": {
    "id": "proto-789",
    "patientId": "456",
    "assignedDentistId": "789",
    "createdByDentistId": "123",
    "procedureType": "SURGERY",
    "priority": "normal",
    "status": "pending",
    "description": "Extração de siso com complicação",
    "encaminhamento": {
      "id": "enc-456",
      "fromDentistId": "123",
      "toDentistId": "789",
      "reason": "Necessidade de avaliação cirúrgica",
      "createdAt": "2024-11-09T10:00:00Z"
    },
    "createdAt": "2024-11-09T10:00:00Z"
  },
  "timestamp": "2024-11-09T10:00:00Z"
}
```

#### ✅ Caso Válido - Procedimento Próprio
**Request**
```http
POST /v1/users/456/protocols/create
Authorization: Bearer {token-dentista-789}
Content-Type: application/json

{
  "assignedDentistId": "789",
  "procedureType": "EVALUATION",
  "priority": "normal",
  "description": "Avaliação inicial ortodôntica"
}
```

**Response** (201 Created)
```javascript
{
  "success": true,
  "data": {
    "id": "proto-790",
    "patientId": "456",
    "assignedDentistId": "789",
    "createdByDentistId": "789",
    "procedureType": "EVALUATION",
    "priority": "normal",
    "status": "pending",
    "description": "Avaliação inicial ortodôntica",
    "createdAt": "2024-11-09T10:00:00Z"
  },
  "timestamp": "2024-11-09T10:00:00Z"
}
```

#### ❌ Caso Inválido - Paciente Inexistente
**Request**
```http
POST /v1/users/999/protocols/create
Authorization: Bearer {token-dentista-123}
Content-Type: application/json

{
  "assignedDentistId": "789",
  "procedureType": "EVALUATION"
}
```

**Response** (404 Not Found)
```javascript
{
  "success": false,
  "error": {
    "code": "PATIENT_NOT_FOUND",
    "message": "Paciente não encontrado"
  },
  "timestamp": "2024-11-09T10:00:00Z"
}
```

#### ❌ Caso Inválido - Dentista Destinatário Inativo
**Request**
```http
POST /v1/users/456/protocols/create
Authorization: Bearer {token-dentista-123}
Content-Type: application/json

{
  "assignedDentistId": "999",
  "procedureType": "SURGERY"
}
```

**Response** (400 Bad Request)
```javascript
{
  "success": false,
  "error": {
    "code": "INVALID_DENTIST",
    "message": "Dentista destinatário não encontrado ou inativo"
  },
  "timestamp": "2024-11-09T10:00:00Z"
}
```

### 4. Atualizar Protocolo
```http
PUT /v1/users/:id/:idProtocols/update
```

**Permissões:** `update_protocols_any`

#### ✅ Caso Válido
**Request**
```http
PUT /v1/users/456/proto-789/update
Authorization: Bearer {token-admin}
Content-Type: application/json

{
  "status": "completed",
  "observations": "Procedimento realizado com sucesso"
}
```

**Response** (200 OK)
```javascript
{
  "success": true,
  "data": {
    "id": "proto-789",
    "patientId": "456",
    "status": "completed",
    "observations": "Procedimento realizado com sucesso",
    "updatedAt": "2024-11-09T10:00:00Z",
    "updatedBy": "admin-123"
  },
  "timestamp": "2024-11-09T10:00:00Z"
}
```

#### ❌ Caso Inválido
**Request**
```http
PUT /v1/users/456/proto-789/update
Authorization: Bearer {token-dentista-sem-permissao}
Content-Type: application/json

{
  "status": "completed"
}
```

**Response** (403 Forbidden)
```javascript
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "Usuário não possui permissão para atualizar protocolos"
  },
  "timestamp": "2024-11-09T10:00:00Z"
}
```

### 5. Listar Protocolos do Paciente
```http
GET /v1/users/:id/protocols
```

**Permissões:** `read_protocols_any` OU `read_protocols_own`

#### ✅ Caso Válido
**Request**
```http
GET /v1/users/456/protocols
Authorization: Bearer {token-dentista-responsavel}
```

**Response** (200 OK)
```javascript
{
  "success": true,
  "data": {
    "protocols": [
      {
        "id": "proto-789",
        "procedureType": "SURGERY",
        "status": "pending",
        "assignedDentistId": "789",
        "createdAt": "2024-11-09T10:00:00Z"
      }
    ],
    "pagination": {
      "total": 5,
      "page": 1,
      "limit": 10
    }
  },
  "timestamp": "2024-11-09T10:00:00Z"
}
```

## Códigos de Erro

- `INSUFFICIENT_PERMISSIONS`: Usuário não possui as permissões necessárias
- `INVALID_TOKEN`: Token de autenticação inválido ou expirado
- `PATIENT_NOT_FOUND`: Paciente não encontrado
- `INVALID_DENTIST`: Dentista não encontrado ou inativo
- `INVALID_PROCEDURE`: Tipo de procedimento inválido
- `PROTOCOL_NOT_FOUND`: Protocolo não encontrado
- `VALIDATION_ERROR`: Erro de validação nos dados enviados
- `UNAUTHORIZED_ACCESS`: Acesso não autorizado ao recurso
- `INTERNAL_ERROR`: Erro interno do servidor

## Considerações Importantes

1. Autenticação:
   - Todas as requisições requerem o header `Authorization` com um token JWT codificado válido
   - O token deve conter as permissões necessárias para cada operação, isto é atribuido ao logar no sistema

2. Encaminhamentos:
   - Qualquer dentista pode criar protocolos para pacientes serem atendidos por outros dentistas
   - É necessário informar o motivo do encaminhamento
   - O sistema mantém o registro do dentista que criou e do dentista que irá atender

3. Permissões:
   - `_any`: Permite acesso a recursos de qualquer usuário
   - `_own`: Permite acesso apenas aos próprios recursos
   - Algumas operações requerem permissões específicas

4. Validações e Pré-condições:
   - Paciente deve existir no sistema
   - Dentista destinatário deve estar ativo
   - Dentista destinatário deve estar disponivel para o dia pretendido
   - Tipos de procedimento devem ser válidos
   - Dados obrigatórios devem ser fornecidos

5. Timestamp:
   - Timestamp serve para verificar as ocorrências 
   - Todas as respostas incluem um timestamp no formato ISO 8601
   - Usado para rastreamento e auditoria
