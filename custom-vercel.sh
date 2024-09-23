if [[ "$VERCEL_GIT_COMMIT_REF" == "master" ]] || [[ "$VERCEL_GIT_COMMIT_REF" == "develop" ]]; then 
  exit 1
else 
  exit 0
fi