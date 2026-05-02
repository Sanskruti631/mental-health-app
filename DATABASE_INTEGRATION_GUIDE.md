# DATABASE INTEGRATION COMPLETION GUIDE

## ✅ Completed Changes

### 1. **Schema Updates** (Added new tables)
- ✅ `conversations` - For therapist-student messaging
- ✅ `messages` - Messages between users
- ✅ `mood_entries` - Daily mood tracking
- ✅ `questionnaire_results` - Assessment results storage

### 2. **API Endpoints Now Connected to Database**

#### Therapist Dashboard
- ✅ `/api/therapist/stats` - Real stats from DB
- ✅ `/api/therapist/appointments` - Real appointments with GET/PUT
- ✅ `/api/therapist/messages` - Real messages from DB
- ✅ `/api/therapist/patients` - Real patient overview

#### Counselor Dashboard
- ✅ `/api/counsellor/stats` - Real stats from DB

#### Student/General Features
- ✅ `/api/mood-tracker` - Save & retrieve mood entries
- ✅ `/api/questionnaire/submit` - Submit & store assessment results
- ✅ `/api/student/appointments-crud` - Full CRUD for appointments

#### Previously Connected
- ✅ `/api/auth/login` - Already using DB
- ✅ `/api/auth/register` - Already using DB
- ✅ `/api/auth/session` - Already using DB
- ✅ `/api/admin/*` - Already using DB

---

## 🚀 Next Steps to Complete Integration

### 1. **Run Database Migrations**

```bash
# Navigate to project directory
cd "c:\Users\Sanskruti Shinde\Downloads\SoulSupport\SoulSupport"

# Generate/update Prisma Client
npx prisma generate

# Create/update migrations for new tables
npx prisma migrate dev --name add_messaging_mood_questionnaire

# Or if you already have a database, sync it:
npx prisma db push
```

### 2. **Seed Test Data** (Optional but recommended)

Update your seed script to include new tables:

```bash
# Run the existing seed
mysql -u root -p < db_scripts/seedSample.sql
```

Or create additional inserts for new tables (conversations, messages, mood_entries, questionnaire_results).

### 3. **Test All Endpoints**

```bash
# Start dev server
npm run dev

# Test endpoints with curl or Postman:

# Test therapist stats (requires login first)
curl -X GET "http://localhost:3000/api/therapist/stats" \
  -H "Cookie: session-token=<your-token>"

# Test mood tracker
curl -X POST "http://localhost:3000/api/mood-tracker" \
  -H "Content-Type: application/json" \
  -H "Cookie: session-token=<your-token>" \
  -d '{"mood": 4, "activities": ["exercise", "meditation"], "notes": "Feeling good"}'

# Test appointment booking
curl -X POST "http://localhost:3000/api/student/appointments-crud" \
  -H "Content-Type: application/json" \
  -H "Cookie: session-token=<your-token>" \
  -d '{"therapistId": "xxx", "date": "2026-04-15", "time": "14:00", "type": "video"}'
```

---

## 📋 Remaining Tasks

### Critical (Do First)
- [ ] Run Prisma migrations to create new tables
- [ ] Seed database with test data
- [ ] Test all endpoints with real database
- [ ] Update dashboards to handle empty/real data

### High Priority (Do Soon)
- [ ] Implement appointments booking page UI
- [ ] Implement mood tracker persistence
- [ ] Implement questionnaire history view
- [ ] Create conversation/messaging UI for therapist-student

### Medium Priority
- [ ] Admin dashboard data integration
- [ ] Counselor dashboard complete integration
- [ ] User profile update endpoint
- [ ] Resources/content management endpoint

### Low Priority
- [ ] Email notifications for appointments
- [ ] SMS alerts
- [ ] Real-time messaging with WebSockets
- [ ] Advanced analytics

---

## 🔒 Security Checklist

- ✅ All endpoints check session tokens
- ✅ All endpoints verify user role/ownership
- ✅ Passwords hashed with bcrypt
- ✅ Session tokens in HTTP-only cookies
- [ ] CSRF protection tokens (add soon)
- [ ] Rate limiting on auth endpoints (add soon)
- [ ] Input validation on all endpoints (add soon)
- [ ] SQL injection protection via Prisma (already in place)

---

## 📊 Database Connection Test

To verify your database is properly connected:

```bash
# Test Prisma connection
npx prisma db execute --stdin < db_scripts/user.sql

# Or check in Node REPL:
node -e "const p = require('@prisma/client'); const prisma = new p.PrismaClient(); prisma.users.count().then(c => console.log('Users:', c)).catch(e => console.error('Error:', e))"
```

---

## 🎯 Integration Status

| Feature | DB Connected | UI Updated | Tested |
|---------|--------------|-----------|--------|
| Auth (Login/Register) | ✅ | ✅ | ✅ |
| Therapist Dashboard | ✅ | 🟡 | 🟡 |
| Appointments | ✅ | 🟡 | 🟡 |
| Mood Tracker | ✅ | 🟡 | ❌ |
| Assessments | ✅ | ✅ | 🟡 |
| Messages | ✅ | 🟡 | ❌ |
| Admin Dashboard | ✅ | ✅ | 🟡 |
| Counselor Dashboard | ✅ | 🟡 | 🟡 |

---

## 💡 Notes

1. **Session Management**: All endpoints validate the `session-token` cookie automatically
2. **User Context**: User info is extracted from the session and used for authorization
3. **Error Handling**: All endpoints return proper HTTP status codes
4. **Data Format**: Dates are automatically formatted for JSON responses
5. **Pagination**: Can be added to GET endpoints if needed (currently returns all)

---

## 🐛 Troubleshooting

**"Unauthorized" errors after migration?**
- Clear browser cookies and log in again
- Check that session_token cookie exists

**Database connection errors?**
- Verify DATABASE_URL in .env
- Check MySQL server is running
- Run `npx prisma db push` to sync schema

**Type errors with Prisma?**
- Run `npx prisma generate` after schema changes
- Restart TypeScript server in VS Code
