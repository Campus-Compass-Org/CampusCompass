import pandas as pd

# === 1️⃣ Load your latest normalized CSV ===
df = pd.read_csv("ClubsScored_withIdentity.csv")

# Identify tag columns (ignore non-tag columns)
tag_cols = [c for c in df.columns if c not in ["Club Name", "links", "Description"]]
tag_data = df[tag_cols].apply(pd.to_numeric, errors="coerce").fillna(0)

print(f"\n🔍 Auditing {len(tag_cols)} tag columns across {len(df)} clubs...\n")

# === 2️⃣ Compute basic tag stats ===
tag_stats = pd.DataFrame({
    "mean": tag_data.mean(),
    "std": tag_data.std(),
    "nonzero_%": (tag_data > 0).sum() / len(df) * 100
})

# === 3️⃣ Identify possible issues ===
flat_tags   = tag_stats[tag_stats["std"] < 0.05]       # almost same value everywhere
empty_tags  = tag_stats[tag_stats["nonzero_%"] < 5]    # rarely used tags
dense_tags  = tag_stats[tag_stats["nonzero_%"] > 80]   # too common tags (too generic)

print("⚠️  Flat / low-variance tags:")
print(flat_tags.sort_values("std").round(3).head(15), "\n")

print("⚠️  Sparse / rarely triggered tags:")
print(empty_tags.sort_values("nonzero_%").round(3).head(15), "\n")

print("⚠️  Overly common tags (appear in 80%+ of clubs):")
print(dense_tags.sort_values("nonzero_%", ascending=False).round(3).head(15), "\n")

# === 4️⃣ Correlation analysis (find duplicates) ===
corr = tag_data.corr().abs()
corr_pairs = []

for i in range(len(corr.columns)):
    for j in range(i + 1, len(corr.columns)):
        val = corr.iloc[i, j]
        if val > 0.85:  # threshold for high similarity
            corr_pairs.append((corr.columns[i], corr.columns[j], val))

corr_df = pd.DataFrame(corr_pairs, columns=["Tag A", "Tag B", "Correlation"])
print("🤝  Highly correlated tag pairs (possible duplicates):")
print(corr_df.sort_values("Correlation", ascending=False).head(20), "\n")

# === 5️⃣ Save full stats ===
tag_stats.to_csv("tag_audit_summary.csv")
corr_df.to_csv("tag_high_correlation_pairs.csv", index=False)

print("✅ Audit complete!")
print("Results saved to 'tag_audit_summary.csv' and 'tag_high_correlation_pairs.csv'")
