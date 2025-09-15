# Permalink generator

This repository includes a small Go script at `docs/.vitepress/script/permalink.go` that scans the `docs` directory,
extracts YAML frontmatter from markdown files, and writes the collected metadata to `data.json` in the repository root.

Run (PowerShell):

```powershell
# ensure modules are downloaded
go mod tidy

# run the script
go run docs/.vitepress/script/permalink.go
```

The script writes `data.json` containing an array of objects with `path` and `meta` fields.
