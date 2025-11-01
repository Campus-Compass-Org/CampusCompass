import pandas as pd
import numpy as np

df = pd.read_csv("ClubsScored_withIdentity.csv")

meta_cols = ["Club Name", "links", "Description"]

tag_cols = [c for c in df.columns if c not in meta_cols]

# Force numeric
df[tag_cols] = df[tag_cols].apply(pd.to_numeric, errors="coerce").fillna(0)

# Denoise
df[tag_cols] = df[tag_cols].applymap(lambda x: 0 if x < 0.15 else x)

# Weight tags based on rarity 
freq = (df[tag_cols] > 0.2).sum() / len(df)
for col in tag_cols:
    if freq[col] < 0.10:
        df[col] *= 1.4
    elif freq[col] > 0.70:
        df[col] *= 0.6

# rescaling
for col in tag_cols:
    col_min, col_max = df[col].min(), df[col].max()
    if col_max > col_min:
        df[col] = (df[col] - col_min) / (col_max - col_min)
    else:
        df[col] = 0

# L2 normalization 
def normalize_row(row):
    vals = row.values
    mag = np.sqrt(np.sum(vals ** 2))
    return vals / mag if mag != 0 else vals

df[tag_cols] = df[tag_cols].apply(normalize_row, axis=1, result_type="expand")

cols = ["Club Name", "links"] + tag_cols + ["Description"]
df = df[cols]

df.to_csv("ClubsScored_normalized_balanced.csv", index=False)
print("✅ ClubsScored_normalized_balanced.csv created with rarity weighting and relaxed denoising.")
