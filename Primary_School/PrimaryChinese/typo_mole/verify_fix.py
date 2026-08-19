
import re

def verify_index_html(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Extract TYPO_PAIRS array content
    match = re.search(r'const TYPO_PAIRS = \[\s*(.*?)\s*\];', content, re.DOTALL)
    if not match:
        print("Could not find TYPO_PAIRS in index.html")
        return
        
    pairs_content = match.group(1)
    
    # Parse pairs
    pairs = []
    # Matches ['word1', 'word2']
    pair_matches = re.findall(r"\['([^']+)',\s*'([^']+)'\]", pairs_content)
    
    for match in pair_matches:
        pairs.append([match[0], match[1]])
        
    print(f"Found {len(pairs)} pairs in index.html")
    
    duplicates = []
    same_word_pairs = []
    seen = set()
    
    for i, pair in enumerate(pairs):
        correct, typo = pair
        
        # Check for exact duplicates
        pair_tuple = (correct, typo)
        if pair_tuple in seen:
            duplicates.append((i, pair))
        else:
            seen.add(pair_tuple)
            
        # Check for same word pairs (correct == typo)
        if correct == typo:
            same_word_pairs.append((i, pair))
            
    if len(duplicates) == 0 and len(same_word_pairs) == 0:
        print("SUCCESS: No duplicates or invalid pairs found!")
    else:
        print(f"FAIL: Found {len(duplicates)} duplicates and {len(same_word_pairs)} invalid pairs.")
        if len(duplicates) > 0:
            print("Duplicates:", duplicates)
        if len(same_word_pairs) > 0:
            print("Invalid pairs:", same_word_pairs)

verify_index_html('index.html')
