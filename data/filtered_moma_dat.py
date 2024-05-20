import pandas as pd

# Load the CSV file
df = pd.read_csv("/Users/colingeraghty/Downloads/Artworks-2.csv")

# Filter the DataFrame based on the given criteria
filtered_df = df[
    (df['Department'] == 'Architecture & Design') &
    (df['Classification'] == 'Architecture') &
    df['Medium'].str.contains('photo', case=False, na=False)
]

# Sort the DataFrame (You can specify the sorting columns if needed, here it's just an example)
sorted_df = filtered_df.sort_values(by=['DateAcquired'], ascending=True)

# Save the sorted DataFrame to a new CSV file in the specified folder
sorted_df.to_csv("/Users/colingeraghty/Documents/DV24/Interactive-Data-Vis-Spring2024/data/Filtered_Artworks.csv", index=False)
