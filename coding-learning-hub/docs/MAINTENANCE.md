# Maintenance Guide

## Weekly

- Review dependency updates.
- Check API logs and rate-limit events.
- Backup progress data if backend persistence is enabled.
- Review broken links in docs and frontend navigation.

## Before Release

- Run syntax checks.
- Run backend tests if test suite is added.
- Validate Docker build.
- Review `.env` and production CORS.
- Confirm CSP does not break required assets.
- Smoke test homepage, roadmap, quiz, playground, and API healthcheck.

## Content Updates

- Add roadmap items in `frontend/data/learning-data.js`.
- Add backend API data in `backend/api/data.py` or move to database when content grows.
- Keep project examples aligned with curriculum topics.
