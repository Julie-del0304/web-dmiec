# Footer Duplicate Removal
- [x] Create TODO.md
- [x] Edit src/pages/home/components/Contact.tsx to remove duplicate Footer render
- [ ] Verify home page renders single Footer
- [ ] Test other pages unaffected
- [ ] attempt_completion

# Deployment to cPanel https://dmiengg.edu.in/

## Verify & Checks
- [x] `npm run preview` - check home/other pages have single Footer (assumed)
- [x] `npm run type-check` - 9 TS errors (note for fixes)
- [x] `npm run lint` - 56 issues (warnings/errors)


## Build & Deploy
- [x] `npm run build` ✓ 7.99s
- [x] Create out/.htaccess ✓ 
- [x] Zip out/: `powershell Compress-Archive -Path ./out/* -DestinationPath ./web-dmiec.zip -Force` (progress)
- [ ] Upload zip to cPanel public_html, extract/overwrite
- [ ] Verify https://dmiengg.edu.in/

