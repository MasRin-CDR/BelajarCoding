# API Examples

## Get Modules

```bash
curl http://127.0.0.1:5000/api/modules
```

## Get Quiz

```bash
curl "http://127.0.0.1:5000/api/quiz?module=python"
```

## Save Progress

```bash
curl -X POST http://127.0.0.1:5000/api/progress \
  -H "Content-Type: application/json" \
  -d '{"module":"python","completed_topics":["python-basics"],"quiz_score":80}'
```

## Admin RBAC Sample

Generate token in Python shell:

```python
from security.token_service import create_signed_token
print(create_signed_token({"sub": "admin@example.com", "role": "admin"}, "change-this-secret"))
```

Use token:

```bash
curl http://127.0.0.1:5000/api/admin/audit-sample \
  -H "Authorization: Bearer <token>"
```
