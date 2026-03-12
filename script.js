// 撲克牌排序遊戲邏輯（原地排序版）

// 撲克牌資料結構
const suits = ['♠', '♥', '♣', '♦'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const rankValues = {
    'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7,
    '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13
};

// 多國語言設定
const supportedLangs = ['zh-TW', 'zh-CN', 'en', 'ja'];
let currentLang = 'zh-TW';

const i18n = {
    'zh-TW': {
        'app.title': '撲克牌排序學院',
        'app.subtitle': '原地排序 · 演算法思維 · 互動教學桌',
        'lang.label': '語言',
        'controls.sortLabel': '排序方式：',
        'controls.sortNone': '❓ 請選擇排序目標',
        'controls.sortNumber': '🔢 依數字大小 (A→K)',
        'controls.sortSuitSymbol': '🃄 依花色符號 (♠♥♣♦)',
        'controls.sortSuitColor': '🎨 依花色顏色 (黑→紅)',
        'controls.sortNumberAsc': '📈 數字遞增 (2→A)',
        'controls.sortNumberDesc': '📉 數字遞減 (K→2)',
        'controls.shuffle': '🔀 重新發牌',
        'stats.comparisons': '比較次數：',
        'stats.swaps': '交換次數：',
        'stats.progress': '完成度：',
        'banner.hint': '🎯 <strong>操作方式：</strong>點擊選擇一張卡片，再點擊另一張進行交換',
        'banner.instruction': '請選擇排序方式後，點擊「重新發牌」開始遊戲',
        'actions.check': '✅ 檢查答案',
        'actions.hint': '💡 顯示提示',
        'actions.reset': '🔄 重置本局',
        'actions.resetDesc': '恢復此次發牌狀態，可重複練習同一組牌',
        'status.resetDone': '已恢復此次發牌狀態，可重複練習！',
        'settings.title': '教學說明與小知識',
        'settings.subtitle': '需要時再打開，讓牌桌保持乾淨。',
        'tabs.guide': '操作說明',
        'tabs.algorithm': '小知識',
        'tabs.advanced': '進階設定',
        'guide.title': '📚 遊戲說明',
        'guide.step1': '選擇排序方式：從下拉選單選擇想要排序的規則（數字、花色、顏色等）。',
        'guide.step2': '發牌：點擊「重新發牌」後，系統會隨機產生卡片排列。',
        'guide.step3': '排序：點擊兩張卡片即可交換位置（點擊第一張會標記為選擇狀態）。',
        'guide.step4': '檢查：完成後點擊「檢查答案」看是否正確。',
        'guide.step5': '提示：如果卡住，可以點擊「顯示提示」或打開完成提示勾勾協助思考。',
        'guide.step6': '統計：上方統計欄會記錄你的比較次數與交換次數。',
        'guide.step7': '重新發牌 vs 重置本局：「重新發牌」會取得新的一組牌；「重置本局」則恢復此次發牌的原有模樣，可重複練習同一組牌。',
        'algo.title': '💡 排序演算法小知識',
        'advanced.title': '進階設定',
        'advanced.cardCount': '牌數：',
        'advanced.uniqueRanks': '不重複數字：',
        'advanced.uniqueRanksDesc': '啟用時，每一局不會出現同數字不同花色（最多 13 張），適合初學者。',
        'advanced.showCorrect': '完成提示：',
        'advanced.showCorrectDesc': '在已排對的位置顯示紅色勾勾',
        'advanced.considerSuit': '花色是否要看：',
        'advanced.considerSuitDesc': '勾選時，同數字不同花色也算正確（適合初學，只看數字）',
        'advanced.spaceMode': '排序空間模式：',
        'advanced.spaceInplace': '原地排序（單一區域）',
        'advanced.spaceExtraspace': '額外空間（上未排序／下已排序）',
        'advanced.spaceModeDesc': '額外空間時，從上方選牌移到下方完成排序，適合練習選擇排序、插入排序等。',
        'zone.unsorted': '未排序',
        'zone.sorted': '已排序',
        'banner.hintExtraspace': '🎯 <strong>操作方式：</strong>點擊上方選一張牌，再點下方虛線格決定插入位置（可示範選擇排序或插入排序）',
        'status.selectInsertPos': '已選「{card}」，請點擊下方虛線格插入',
        'status.insertHere': '插入這裡',
        'status.cancelInsert': '已取消選擇，請從上方再選一張牌',
        'status.needSortMethod': '請選擇排序方式開始遊戲',
        'status.needSortBeforeShuffle': '請先選擇排序方式！',
        'status.dealt': '拿到 {count} 張牌，請依 {method} 排序！',
        'status.selectCard': '已選擇第 {index} 張牌（{card}），請點擊另一張進行交換',
        'status.cancelSelect': '已取消選擇，請點擊兩張卡片進行交換',
        'status.correct': '🎉 完全正確！你用了 {comparisons} 次比較、{swaps} 次交換{efficiency}',
        'status.incorrect': '❌ 還沒正確，繼續加油！可以點擊提示了解排序規則。',
        'status.hintNeedStart': '請先選擇排序方式並重新發牌，再使用提示。',
        'status.hintPrefix': '💡 ',
        'hint.number': '數字排序：A最小(1)，K最大(13)，從小到大排。可以想像在做氣泡排序，讓錯誤順序的相鄰牌互換位置。',
        'hint.numberAsc': '遞增：2→3→…→K→A。從最左邊開始，把較小的數字慢慢換到前面（選擇排序思路）。',
        'hint.numberDesc': '遞減：K→Q→…→3→2。從最左邊開始，把較大的數字換到前面。',
        'hint.suitSymbol': '花色順序（台灣習慣）：♠ (黑桃) > ♥ (紅心) > ♦ (方塊) > ♣ (梅花)。',
        'hint.suitColor': '顏色：先黑(♠,♣)後紅(♥,♦)。先把黑色的全部移到左側。',
        'hint.moveExact': '建議下一步：把第 {from} 張的「{card}」換到第 {to} 張的位置。',
        'hint.observe': '觀察第 {index} 張的「{card}」，它現在不在正確位置，試著把它換到更接近正確位置。'
    },
    'zh-CN': {
        'app.title': '扑克牌排序学院',
        'app.subtitle': '原地排序 · 算法思维 · 互动教学桌',
        'lang.label': '语言',
        'controls.sortLabel': '排序方式：',
        'controls.sortNone': '❓ 请选择排序目标',
        'controls.sortNumber': '🔢 按数字大小 (A→K)',
        'controls.sortSuitSymbol': '🃄 按花色符号 (♠♥♣♦)',
        'controls.sortSuitColor': '🎨 按花色颜色 (黑→红)',
        'controls.sortNumberAsc': '📈 数字递增 (2→A)',
        'controls.sortNumberDesc': '📉 数字递减 (K→2)',
        'controls.shuffle': '🔀 重新发牌',
        'stats.comparisons': '比较次数：',
        'stats.swaps': '交换次数：',
        'stats.progress': '完成度：',
        'banner.hint': '🎯 <strong>操作方式：</strong>点击选一张牌，再点击另一张进行交换',
        'banner.instruction': '请选择排序方式后，点击「重新发牌」开始游戏',
        'actions.check': '✅ 检查答案',
        'actions.hint': '💡 显示提示',
        'actions.reset': '🔄 重置本局',
        'actions.resetDesc': '恢复此次发牌状态，可重复练习同一组牌',
        'status.resetDone': '已恢复此次发牌状态，可重复练习！',
        'settings.title': '教学说明与小知识',
        'settings.subtitle': '需要时再打开，让牌桌保持干净。',
        'tabs.guide': '操作说明',
        'tabs.algorithm': '小知识',
        'tabs.advanced': '进阶设定',
        'guide.title': '📚 游戏说明',
        'guide.step1': '选择排序方式：从下拉选单选择要排序的规则（数字、花色、颜色等）。',
        'guide.step2': '发牌：点击「重新发牌」后，系统会随机产生卡片排列。',
        'guide.step3': '排序：点击两张卡片即可交换位置（点击第一张会标记为选择状态）。',
        'guide.step4': '检查：完成后点击「检查答案」看是否正确。',
        'guide.step5': '提示：如果卡住，可以点击「显示提示」或打开完成提示勾勾协助思考。',
        'guide.step6': '统计：上方统计栏会记录你的比较次数与交换次数。',
        'guide.step7': '重新发牌 vs 重置本局：「重新发牌」会取得新的一组牌；「重置本局」则恢复此次发牌的原有模样，可重复练习同一组牌。',
        'algo.title': '💡 排序算法小知识',
        'advanced.title': '进阶设定',
        'advanced.cardCount': '牌数：',
        'advanced.uniqueRanks': '不重复数字：',
        'advanced.uniqueRanksDesc': '启用时，每一局不会出现同数字不同花色（最多 13 张），适合初学者。',
        'advanced.showCorrect': '完成提示：',
        'advanced.showCorrectDesc': '在已排对的位置显示红色勾勾',
        'advanced.considerSuit': '是否看花色：',
        'advanced.considerSuitDesc': '勾选时，同数字不同花色也算正确（适合初学，只看数字）',
        'advanced.spaceMode': '排序空间模式：',
        'advanced.spaceInplace': '原地排序（单一区域）',
        'advanced.spaceExtraspace': '额外空间（上未排序／下已排序）',
        'advanced.spaceModeDesc': '额外空间时，从上方选牌移到下方完成排序，适合练习选择排序、插入排序等。',
        'zone.unsorted': '未排序',
        'zone.sorted': '已排序',
        'banner.hintExtraspace': '🎯 <strong>操作方式：</strong>点击上方选一张牌，再点下方虚线格决定插入位置（可示范选择排序或插入排序）',
        'status.selectInsertPos': '已选「{card}」，请点击下方虚线格插入',
        'status.insertHere': '插入这里',
        'status.cancelInsert': '已取消选择，请从上方再选一张牌',
        'status.needSortMethod': '请选择排序方式开始游戏',
        'status.needSortBeforeShuffle': '请先选择排序方式！',
        'status.dealt': '拿到 {count} 张牌，请依 {method} 排序！',
        'status.selectCard': '已选择第 {index} 张牌（{card}），请点击另一张进行交换',
        'status.cancelSelect': '已取消选择，请点击两张卡片进行交换',
        'status.correct': '🎉 完全正确！你用了 {comparisons} 次比较、{swaps} 次交换{efficiency}',
        'status.incorrect': '❌ 还没正确，继续加油！可以点击提示了解排序规则。',
        'status.hintNeedStart': '请先选择排序方式并重新发牌，再使用提示。',
        'status.hintPrefix': '💡 ',
        'hint.number': '数字排序：A最小(1)，K最大(13)，从小到大排。可以想像成冒泡排序，让顺序错误的相邻牌互换位置。',
        'hint.numberAsc': '递增：2→3→…→K→A。从最左边开始，把较小的数字慢慢换到前面（选择排序思路）。',
        'hint.numberDesc': '递减：K→Q→…→3→2。从最左边开始，把较大的数字换到前面。',
        'hint.suitSymbol': '花色顺序（台湾常见）：♠ (黑桃) > ♥ (红心) > ♦ (方块) > ♣ (梅花)。',
        'hint.suitColor': '颜色：先黑(♠,♣)后红(♥,♦)，先把黑色的全部移到左侧。',
        'hint.moveExact': '建议下一步：把第 {from} 张的「{card}」换到第 {to} 张的位置。',
        'hint.observe': '观察第 {index} 张的「{card}」，它现在不在正确位置，试着把它换到更接近正确位置。'
    },
    'en': {
        'app.title': 'Card Sorting Academy',
        'app.subtitle': 'In-place sorting · Algorithmic thinking · Interactive table',
        'lang.label': 'Language',
        'controls.sortLabel': 'Sort by:',
        'controls.sortNone': '❓ Choose a target',
        'controls.sortNumber': '🔢 Rank value (A→K)',
        'controls.sortSuitSymbol': '🃄 Suit symbol (♠♥♣♦)',
        'controls.sortSuitColor': '🎨 Suit color (Black→Red)',
        'controls.sortNumberAsc': '📈 Number ascending (2→A)',
        'controls.sortNumberDesc': '📉 Number descending (K→2)',
        'controls.shuffle': '🔀 Deal again',
        'stats.comparisons': 'Comparisons:',
        'stats.swaps': 'Swaps:',
        'stats.progress': 'Progress:',
        'banner.hint': '🎯 <strong>How to play:</strong> click one card, then another to swap them.',
        'banner.instruction': 'Choose a sort target, then click “Deal again” to start.',
        'actions.check': '✅ Check answer',
        'actions.hint': '💡 Show hint',
        'actions.reset': '🔄 Reset round',
        'actions.resetDesc': 'Restore this deal so you can practice the same cards again',
        'status.resetDone': 'Round restored. Practice the same cards again!',
        'settings.title': 'Guide & Algorithm notes',
        'settings.subtitle': 'Open when needed to keep the table clean.',
        'tabs.guide': 'Guide',
        'tabs.algorithm': 'Algorithms',
        'tabs.advanced': 'Advanced',
        'guide.title': '📚 How to play',
        'guide.step1': 'Choose a sort target from the dropdown (number, suit, color, etc.).',
        'guide.step2': 'Deal: click “Deal again” to shuffle and deal the cards.',
        'guide.step3': 'Sort: click two cards to swap their positions (the first one is highlighted).',
        'guide.step4': 'Check: when you think it is sorted, click “Check answer”.',
        'guide.step5': 'Hint: use “Show hint” or enable check marks when you get stuck.',
        'guide.step6': 'Stats: the bar above tracks comparisons and swaps.',
        'guide.step7': 'Deal again vs Reset round: “Deal again” gets a new set of cards; “Reset round” restores this deal so you can practice the same cards again.',
        'algo.title': '💡 Sorting algorithm notes',
        'advanced.title': 'Advanced settings',
        'advanced.cardCount': 'Number of cards:',
        'advanced.uniqueRanks': 'Unique ranks only:',
        'advanced.uniqueRanksDesc': 'When enabled, each round uses non‑repeating ranks (up to 13 cards) – easier for beginners.',
        'advanced.showCorrect': 'Completion marks:',
        'advanced.showCorrectDesc': 'Show a red checkmark on positions that are already correct.',
        'advanced.considerSuit': 'Consider suit:',
        'advanced.considerSuitDesc': 'When enabled, both rank and suit must match (turn off for “numbers only” mode).',
        'advanced.spaceMode': 'Space mode:',
        'advanced.spaceInplace': 'In-place (single area)',
        'advanced.spaceExtraspace': 'Extra space (unsorted above / sorted below)',
        'advanced.spaceModeDesc': 'In extra-space mode, click a card in the unsorted area to move it to the sorted area. Good for selection sort, insertion sort practice.',
        'zone.unsorted': 'Unsorted',
        'zone.sorted': 'Sorted',
        'banner.hintExtraspace': '🎯 <strong>How to play:</strong> click a card above, then click a dashed slot below to insert (selection sort or insertion sort).',
        'status.selectInsertPos': 'Selected "{card}". Click a dashed slot below to insert.',
        'status.insertHere': 'Insert here',
        'status.cancelInsert': 'Selection cleared. Click a card above to choose one.',
        'status.needSortMethod': 'Please choose a sort target to start.',
        'status.needSortBeforeShuffle': 'Please choose a sort target first!',
        'status.dealt': 'You got {count} cards. Sort them by {method}.',
        'status.selectCard': 'Selected card #{index} ({card}). Click another card to swap.',
        'status.cancelSelect': 'Selection cleared. Click two cards to swap.',
        'status.correct': '🎉 Perfect! You used {comparisons} comparisons and {swaps} swaps{efficiency}',
        'status.incorrect': '❌ Not sorted yet. Keep going! Use hints to learn the rule.',
        'status.hintNeedStart': 'Choose a sort target and deal cards before using hints.',
        'status.hintPrefix': '💡 ',
        'hint.number': 'Number sort: A is 1 (smallest), K is 13 (largest). Think of bubble sort: swap adjacent cards that are out of order.',
        'hint.numberAsc': 'Ascending: 2→3→…→K→A. Start from the left and gradually move smaller numbers forward (selection-sort style).',
        'hint.numberDesc': 'Descending: K→Q→…→3→2. Start from the left and move larger numbers forward.',
        'hint.suitSymbol': 'Suit order (this app): ♠ > ♥ > ♦ > ♣.',
        'hint.suitColor': 'Color: black (♠,♣) first, then red (♥,♦). Move all black cards to the left.',
        'hint.moveExact': 'Next step suggestion: move card “{card}” from position {from} to position {to}.',
        'hint.observe': 'Look at card “{card}” in position {index}; it is not correct yet, try moving it closer to its target spot.'
    },
    'ja': {
        'app.title': 'トランプソートアカデミー',
        'app.subtitle': 'インプレースソート · アルゴリズム思考 · インタラクティブ卓',
        'lang.label': '言語',
        'controls.sortLabel': '並べ替え基準：',
        'controls.sortNone': '❓ 並べ替えの目的を選んでください',
        'controls.sortNumber': '🔢 数字の大きさ (A→K)',
        'controls.sortSuitSymbol': '🃄 絵柄の順番 (♠♥♣♦)',
        'controls.sortSuitColor': '🎨 色の順番 (黒→赤)',
        'controls.sortNumberAsc': '📈 数字昇順 (2→A)',
        'controls.sortNumberDesc': '📉 数字降順 (K→2)',
        'controls.shuffle': '🔀 カードを配り直す',
        'stats.comparisons': '比較回数：',
        'stats.swaps': '交換回数：',
        'stats.progress': '完成度：',
        'banner.hint': '🎯 <strong>操作方法：</strong>1枚目をクリックして選択し、2枚目をクリックすると位置を入れ替えます。',
        'banner.instruction': '並べ替え基準を選んでから、「カードを配り直す」をクリックしてください。',
        'actions.check': '✅ 答えをチェック',
        'actions.hint': '💡 ヒントを表示',
        'actions.reset': '🔄 この局をリセット',
        'actions.resetDesc': '今回配った状態に戻し、同じカードで繰り返し練習',
        'status.resetDone': '配り直しの状態に戻しました。同じ並びで練習できます。',
        'settings.title': '遊び方とアルゴリズムメモ',
        'settings.subtitle': '必要なときだけ開いて、テーブルをすっきり保ちます。',
        'tabs.guide': '遊び方',
        'tabs.algorithm': 'アルゴリズム',
        'tabs.advanced': '詳細設定',
        'guide.title': '📚 遊び方',
        'guide.step1': 'プルダウンから並べ替え基準を選びます（数字・絵柄・色など）。',
        'guide.step2': '配る：「カードを配り直す」をクリックすると、ランダムに並びます。',
        'guide.step3': '並べ替え：2枚のカードをクリックして位置を入れ替えます（1枚目は強調表示されます）。',
        'guide.step4': 'チェック：並べ終わったと思ったら「答えをチェック」を押します。',
        'guide.step5': 'ヒント：行き詰まったら「ヒントを表示」や完了マーク機能を使ってください。',
        'guide.step6': '統計：上部バーで比較回数と交換回数を確認できます。',
        'guide.step7': '配り直し vs この局をリセット：「配り直す」は新しいカード、「この局をリセット」は今回の配り状態に戻して同じ並びで練習できます。',
        'algo.title': '💡 ソートアルゴリズムの豆知識',
        'advanced.title': '詳細設定',
        'advanced.cardCount': 'カード枚数：',
        'advanced.uniqueRanks': '数字の重複なし：',
        'advanced.uniqueRanksDesc': 'オンにすると、各ラウンドで同じ数字のカードは出ません（最大13枚）。初心者向けです。',
        'advanced.showCorrect': '完了マーク：',
        'advanced.showCorrectDesc': '正しい位置にあるカードに赤いチェックマークを表示します。',
        'advanced.considerSuit': '絵柄も判定：',
        'advanced.considerSuitDesc': 'オンにすると数字だけでなく絵柄も一致している必要があります（オフで「数字だけ」モード）。',
        'advanced.spaceMode': '並べ替え空間モード：',
        'advanced.spaceInplace': 'インプレース（1つの領域）',
        'advanced.spaceExtraspace': '追加領域（上：未ソート／下：ソート済み）',
        'advanced.spaceModeDesc': '追加領域では、上の未ソートのカードをクリックすると下のソート済み領域に移動します。選択ソート・挿入ソートの練習に最適です。',
        'zone.unsorted': '未ソート',
        'zone.sorted': 'ソート済み',
        'banner.hintExtraspace': '🎯 <strong>操作方法：</strong>上のカードを1枚選び、下の点線の枠をクリックして挿入位置を決めます（選択ソート・挿入ソート）。',
        'status.selectInsertPos': '「{card}」を選択しました。下の点線枠をクリックして挿入してください。',
        'status.insertHere': 'ここに挿入',
        'status.cancelInsert': '選択をキャンセルしました。上のカードをクリックして選んでください。',
        'status.needSortMethod': '並べ替え基準を選んでからゲームを開始してください。',
        'status.needSortBeforeShuffle': '先に並べ替え基準を選んでください！',
        'status.dealt': '{count} 枚のカードを配りました。「{method}」の順になるように並べてください。',
        'status.selectCard': '{index} 枚目のカード（{card}）を選択しました。入れ替えたいもう1枚をクリックしてください。',
        'status.cancelSelect': '選択をキャンセルしました。入れ替えたい2枚をクリックしてください。',
        'status.correct': '🎉 ばっちり正解！比較 {comparisons} 回・交換 {swaps} 回で並べ替えました{efficiency}',
        'status.incorrect': '❌ まだ正解ではありません。ヒントを使ってルールを確認してみましょう。',
        'status.hintNeedStart': '並べ替え基準を選んでカードを配ってから、ヒントを使ってください。',
        'status.hintPrefix': '💡 ',
        'hint.number': '数字の並べ替え：A は最小 (1)、K は最大 (13)。バブルソートのように、順番が逆の隣り合うカードを入れ替えていきます。',
        'hint.numberAsc': '昇順：2→3→…→K→A。左から見て、より小さい数字を前のほうへ動かしていきます（選択ソートのイメージ）。',
        'hint.numberDesc': '降順：K→Q→…→3→2。左から見て、より大きい数字を前のほうへ動かします。',
        'hint.suitSymbol': '絵柄の順番（このアプリ）：♠ > ♥ > ♦ > ♣。',
        'hint.suitColor': '色の順番：黒(♠,♣) → 赤(♥,♦)。まず黒いカードを左側に集めます。',
        'hint.moveExact': '次の一手のヒント：{from} 枚目の「{card}」を {to} 枚目の位置に入れ替えましょう。',
        'hint.observe': '{index} 枚目の「{card}」は正しい位置ではありません。正しい場所に近づけるように動かしてみましょう。'
    }
};

function applyTranslations() {
    const dict = i18n[currentLang] || i18n['zh-TW'];
    const nodes = document.querySelectorAll('[data-i18n-key]');
    nodes.forEach(node => {
        const key = node.getAttribute('data-i18n-key');
        if (!key) return;
        const text = dict[key];
        if (!text) return;
        // 有些內容包含 HTML（例如帶 <strong>），用 innerHTML
        if (text.includes('<') && text.includes('>')) {
            node.innerHTML = text;
        } else {
            node.textContent = text;
        }
    });
    // 操作方式小提示（依模式與語言更新）
    if (elements.instructionHint) {
        const hintP = elements.instructionHint.querySelector('p');
        if (hintP) {
            const key = gameState.spaceMode === 'extraspace' ? 'banner.hintExtraspace' : 'banner.hint';
            hintP.innerHTML = dict[key] || i18n['zh-TW'][key] || '';
        }
    }
    // 重置本局按鈕的 title 說明
    if (elements.resetBtn) elements.resetBtn.title = dict['actions.resetDesc'] || i18n['zh-TW']['actions.resetDesc'] || '';
    // 切換語言後，依目前遊戲狀態用新語言重設狀態列與小提示
    refreshStatusForCurrentLang();
    if (gameState.isGameActive && gameState.cards.length > 0) renderCards();
}

// 依目前遊戲狀態，用當前語言更新狀態列（切換語言時呼叫）
function refreshStatusForCurrentLang() {
    const dict = i18n[currentLang] || i18n['zh-TW'];
    if (!elements.status) return;
    if (!gameState.isGameActive || gameState.currentSortMethod === 'none') {
        elements.status.textContent = dict['status.needSortMethod'] || i18n['zh-TW']['status.needSortMethod'];
        elements.status.className = 'status info';
        return;
    }
    if (gameState.cards.length === 0) {
        elements.status.textContent = dict['status.needSortMethod'] || i18n['zh-TW']['status.needSortMethod'];
        elements.status.className = 'status info';
        return;
    }
    if (gameState.spaceMode === 'extraspace' && gameState.selectedUnsortedIndex >= 0) {
        const card = gameState.unsortedOrder[gameState.selectedUnsortedIndex];
        const tmpl = dict['status.selectInsertPos'] || i18n['zh-TW']['status.selectInsertPos'];
        elements.status.textContent = card ? tmpl.replace('{card}', `${card.rank}${card.suit}`) : tmpl;
        elements.status.className = 'status info';
        return;
    }
    if (gameState.spaceMode === 'inplace' && gameState.selectedIndex >= 0) {
        const tmpl = dict['status.selectCard'] || i18n['zh-TW']['status.selectCard'];
        const msg = tmpl
            .replace('{index}', String(gameState.selectedIndex + 1))
            .replace('{card}', getCardNameInplace(gameState.selectedIndex));
        elements.status.textContent = msg;
        elements.status.className = 'status info';
        return;
    }
    const tmpl = dict['status.dealt'] || i18n['zh-TW']['status.dealt'];
    elements.status.textContent = tmpl
        .replace('{count}', String(gameState.cardCount))
        .replace('{method}', getSortMethodName());
    elements.status.className = 'status info';
}

function updateLangButtonLabel() {
    if (!elements.langButton) return;
    const codeMap = {
        'zh-TW': 'TW',
        'zh-CN': 'CN',
        'en': 'EN',
        'ja': 'JP'
    };
    elements.langButton.textContent = codeMap[currentLang] || 'TW';
}

// 遊戲狀態
let gameState = {
    cards: [],           // 原始牌組（順序不變）
    currentOrder: [],    // 目前排列順序（卡片物件陣列）- 原地模式用
    unsortedOrder: [],   // 額外空間模式：未排序區的牌
    sortedOrder: [],     // 額外空間模式：已排序區的牌
    selectedUnsortedIndex: -1, // 額外空間：已選定要插入的未排序牌 index（-1 表示未選）
    selectedIndex: -1,   // 當前選中的卡片index（-1表示無）
    spaceMode: 'inplace', // 'inplace' | 'extraspace'
    currentSortMethod: 'number',
    cardCount: 6,
    isGameActive: false,
    comparisons: 0,      // 比較次數
    swaps: 0,            // 交換次數（額外空間時表示「移動」次數）
    allowSameRankAnySuit: true, // 是否允許同數字不同花色視為正確
    uniqueRanksOnly: true       // 是否發牌時避免數字重複（最多 13 張）
};

// DOM 元素
const elements = {
    sortMethod: document.getElementById('sort-method'),
    shuffleBtn: document.getElementById('shuffle-btn'),
    cardCount: document.getElementById('card-count'),
    cardCountDisplay: document.getElementById('card-count-display'),
    spaceMode: document.getElementById('space-mode'),
    cardAreaInplace: document.getElementById('card-area-inplace'),
    cardZonesExtraspace: document.getElementById('card-zones-extraspace'),
    cardArea: document.getElementById('card-area'),
    cardAreaUnsorted: document.getElementById('card-area-unsorted'),
    cardAreaSorted: document.getElementById('card-area-sorted'),
    status: document.getElementById('status'),
    hint: document.getElementById('hint'),
    checkBtn: document.getElementById('check-btn'),
    hintBtn: document.getElementById('hint-btn'),
    resetBtn: document.getElementById('reset-btn'),
    algorithmDesc: document.getElementById('algorithm-desc'),
    comparisonsDisplay: document.getElementById('comparisons'),
    swapsDisplay: document.getElementById('swaps'),
    progressDisplay: document.getElementById('progress'),
    instructionHint: document.getElementById('instruction-hint'),
    closeHint: document.getElementById('close-hint'),
    showCorrectToggle: document.getElementById('show-correct-toggle'),
    allowSameRankToggle: document.getElementById('allow-same-rank-toggle'),
    algorithmMode: document.getElementById('algorithm-mode'),
    algorithmSteps: document.getElementById('algorithm-steps'),
    settingsToggle: document.getElementById('settings-toggle'),
    settingsCard: document.getElementById('settings-card'),
    settingsClose: document.getElementById('settings-close'),
    uniqueRankToggle: document.getElementById('unique-rank-toggle'),
    settingsTabs: document.getElementById('settings-tabs'),
    infoToggle: document.getElementById('info-toggle'),
    infoCard: document.getElementById('info-card'),
    infoClose: document.getElementById('info-close'),
    infoTabs: document.getElementById('info-tabs'),
    langSelect: document.getElementById('lang-select'),
    langButton: document.getElementById('lang-button')
};

// 初始化
function init() {
    bindEvents();
    // 預設使用「依數字大小」並直接發牌
    elements.sortMethod.value = 'number';
    gameState.currentSortMethod = 'number';
    gameState.spaceMode = elements.spaceMode ? elements.spaceMode.value : 'inplace';
    switchSpaceModeUI(gameState.spaceMode);
    updateAlgorithmInfo('number');
    if (elements.allowSameRankToggle) {
        elements.allowSameRankToggle.checked = true;
        gameState.allowSameRankAnySuit = true;
    }
    if (elements.uniqueRankToggle) {
        elements.uniqueRankToggle.checked = true;
        gameState.uniqueRanksOnly = true;
    }
    if (elements.cardCountDisplay) {
        elements.cardCountDisplay.textContent = `${gameState.cardCount} 張`;
    }
    // 語言初始化
    if (elements.langSelect) {
        const browserLang = (navigator.language || navigator.userLanguage || 'zh-TW').toLowerCase();
        const matched = supportedLangs.find(l => browserLang.startsWith(l.toLowerCase()));
        currentLang = matched || 'zh-TW';
        elements.langSelect.value = currentLang;
    }
    applyTranslations();
    updateLangButtonLabel();
    setGameActive(true);
    elements.closeHint.addEventListener('click', () => {
        elements.instructionHint.style.display = 'none';
    });
}

// 綁定事件
function bindEvents() {
    elements.shuffleBtn.addEventListener('click', shuffleAndDeal);
    elements.sortMethod.addEventListener('change', onSortMethodChange);
    elements.cardCount.addEventListener('input', onCardCountChange);
    elements.checkBtn.addEventListener('click', checkAnswer);
    elements.hintBtn.addEventListener('click', showHint);
    elements.resetBtn.addEventListener('click', resetGame);
    if (elements.showCorrectToggle) {
        elements.showCorrectToggle.addEventListener('change', updateCorrectIndicators);
    }
    if (elements.allowSameRankToggle) {
        elements.allowSameRankToggle.addEventListener('change', (e) => {
            gameState.allowSameRankAnySuit = e.target.checked;
            updateProgress();
            updateCorrectIndicators();
        });
    }

    if (elements.uniqueRankToggle) {
        elements.uniqueRankToggle.addEventListener('change', (e) => {
            gameState.uniqueRanksOnly = e.target.checked;
            // 變更規則後，建議重新發牌以套用設定
            if (gameState.isGameActive) {
                shuffleAndDeal();
            }
        });
    }

    if (elements.spaceMode) {
        elements.spaceMode.addEventListener('change', (e) => {
            gameState.spaceMode = e.target.value;
            switchSpaceModeUI(gameState.spaceMode);
            if (gameState.isGameActive && gameState.cards.length > 0) {
                // 切換模式時重新發牌以套用新佈局
                shuffleAndDeal();
            }
        });
    }

    if (elements.settingsToggle && elements.settingsCard) {
        elements.settingsToggle.addEventListener('click', () => {
            elements.settingsCard.classList.toggle('open');
        });
    }

    if (elements.settingsClose && elements.settingsCard) {
        elements.settingsClose.addEventListener('click', () => {
            elements.settingsCard.classList.remove('open');
        });
    }

    // 教學 info 卡片開關
    if (elements.infoToggle && elements.infoCard) {
        elements.infoToggle.addEventListener('click', () => {
            elements.infoCard.classList.toggle('open');
        });
    }
    if (elements.infoClose && elements.infoCard) {
        elements.infoClose.addEventListener('click', () => {
            elements.infoCard.classList.remove('open');
        });
    }

    // 說明 / 小知識 頁簽切換（info 卡片）
    if (elements.infoTabs) {
        const tabButtons = elements.infoTabs.querySelectorAll('.settings-tab');
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.dataset.pane;
                if (!targetId) return;

                // 切換 tab 樣式
                tabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // 切換 pane 顯示
                const panes = document.querySelectorAll('.settings-pane');
                panes.forEach(pane => {
                    pane.classList.toggle('active', pane.id === targetId);
                });
            });
        });
    }

    if (elements.langSelect) {
        elements.langSelect.addEventListener('change', (e) => {
            const value = e.target.value;
            if (supportedLangs.includes(value)) {
                currentLang = value;
                applyTranslations();
                updateLangButtonLabel();
                // 依新語言更新演算法說明
                updateAlgorithmInfo(gameState.currentSortMethod || 'number');
            }
        });
    }

    if (elements.langButton) {
        elements.langButton.addEventListener('click', () => {
            const idx = supportedLangs.indexOf(currentLang);
            const nextIdx = idx === -1 ? 0 : (idx + 1) % supportedLangs.length;
            currentLang = supportedLangs[nextIdx];
            if (elements.langSelect) {
                elements.langSelect.value = currentLang;
            }
            applyTranslations();
            updateLangButtonLabel();
            updateAlgorithmInfo(gameState.currentSortMethod || 'number');
        });
    }
}

// 事件處理
function onSortMethodChange(e) {
    gameState.currentSortMethod = e.target.value;
    updateAlgorithmInfo(e.target.value);
    setGameActive(e.target.value !== 'none');
}

function onCardCountChange(e) {
    const count = parseInt(e.target.value);
    gameState.cardCount = count;
    elements.cardCountDisplay.textContent = `${count} 張`;
}

// 切換空間模式 UI（顯示／隱藏單一區 vs 上下分區）
function switchSpaceModeUI(mode) {
    const isExtraspace = mode === 'extraspace';
    if (elements.cardAreaInplace) {
        elements.cardAreaInplace.style.display = isExtraspace ? 'none' : 'block';
        elements.cardAreaInplace.setAttribute('aria-hidden', isExtraspace ? 'true' : 'false');
    }
    if (elements.cardZonesExtraspace) {
        // 必須明確設為 block，否則 CSS 的 display:none 會讓額外空間區永遠不顯示
        elements.cardZonesExtraspace.style.display = isExtraspace ? 'block' : 'none';
        elements.cardZonesExtraspace.setAttribute('aria-hidden', isExtraspace ? 'false' : 'true');
    }
    // 更新操作提示
    const hintP = elements.instructionHint ? elements.instructionHint.querySelector('p') : null;
    if (hintP) {
        const dict = i18n[currentLang] || i18n['zh-TW'];
        const key = isExtraspace ? 'banner.hintExtraspace' : 'banner.hint';
        hintP.innerHTML = dict[key] || i18n['zh-TW'][key] || '';
    }
}

function setGameActive(active) {
    gameState.isGameActive = active;
    elements.checkBtn.disabled = !active;
    elements.hintBtn.disabled = !active;
    elements.resetBtn.disabled = !active;

    if (active) {
        shuffleAndDeal();
    } else {
        clearCards();
        const dict = i18n[currentLang] || i18n['zh-TW'];
        setStatus(dict['status.needSortMethod'] || i18n['zh-TW']['status.needSortMethod'], 'info');
    }
}

// 生成一副撲克牌
function createDeck() {
    const deck = [];
    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push({
                suit: suit,
                rank: rank,
                color: (suit === '♥' || suit === '♦') ? 'red' : 'black',
                value: rankValues[rank]
            });
        }
    }
    return deck;
}

// 產生「數字不重複」的牌組（最多 13 張）
function createUniqueRankCards(count) {
    const result = [];
    const shuffledRanks = [...ranks];
    // 洗 rank
    for (let i = shuffledRanks.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledRanks[i], shuffledRanks[j]] = [shuffledRanks[j], shuffledRanks[i]];
    }

    const takeCount = Math.min(count, shuffledRanks.length);
    for (let i = 0; i < takeCount; i++) {
        const rank = shuffledRanks[i];
        const suit = suits[Math.floor(Math.random() * suits.length)];
        result.push({
            suit,
            rank,
            color: (suit === '♥' || suit === '♦') ? 'red' : 'black',
            value: rankValues[rank]
        });
    }
    return result;
}

// 洗牌並發牌
function shuffleAndDeal() {
    if (gameState.currentSortMethod === 'none') {
        const dict = i18n[currentLang] || i18n['zh-TW'];
        setStatus(dict['status.needSortBeforeShuffle'] || i18n['zh-TW']['status.needSortBeforeShuffle'], 'error');
        return;
    }

    // 重置統計
    gameState.comparisons = 0;
    gameState.swaps = 0;
    gameState.selectedIndex = -1;
    updateStats();

    let cardsToUse;
    if (gameState.uniqueRanksOnly && gameState.cardCount <= ranks.length) {
        cardsToUse = createUniqueRankCards(gameState.cardCount);
    } else {
        const deck = createDeck();
        // Fisher-Yates 洗牌
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        cardsToUse = deck.slice(0, gameState.cardCount);
    }

    gameState.cards = cardsToUse;
    if (gameState.spaceMode === 'extraspace') {
        gameState.unsortedOrder = [...gameState.cards];
        gameState.sortedOrder = [];
        gameState.selectedUnsortedIndex = -1;
    } else {
        gameState.currentOrder = [...gameState.cards];  // 目前排列順序
    }

    renderCards();
    const dict = i18n[currentLang] || i18n['zh-TW'];
    const tmpl = dict['status.dealt'] || i18n['zh-TW']['status.dealt'];
    const msg = tmpl
        .replace('{count}', gameState.cardCount)
        .replace('{method}', getSortMethodName());
    setStatus(msg, 'info');
}

// 渲染卡片
function renderCards() {
    if (gameState.spaceMode === 'extraspace') {
        if (elements.cardAreaUnsorted) {
            elements.cardAreaUnsorted.innerHTML = '';
            if (gameState.unsortedOrder.length === 0 && gameState.sortedOrder.length === 0) {
                const p = document.createElement('p');
                p.className = 'instruction';
                p.setAttribute('data-i18n-key', 'banner.instruction');
                p.textContent = (i18n[currentLang] || i18n['zh-TW'])['banner.instruction'] || '請選擇排序方式後，點擊「重新發牌」開始遊戲';
                elements.cardAreaUnsorted.appendChild(p);
            } else {
                gameState.unsortedOrder.forEach((card, index) => {
                    const cardEl = createCardElement(card, index, 'unsorted');
                    if (index === gameState.selectedUnsortedIndex) cardEl.classList.add('selected');
                    elements.cardAreaUnsorted.appendChild(cardEl);
                });
            }
        }
        if (elements.cardAreaSorted) {
            elements.cardAreaSorted.innerHTML = '';
            const showInsertSlots = gameState.selectedUnsortedIndex >= 0;
            if (showInsertSlots) {
                // 插入排序：虛線格 + 已排好的牌交錯 [格0][牌0][格1][牌1]…[格n]
                for (let i = 0; i <= gameState.sortedOrder.length; i++) {
                    elements.cardAreaSorted.appendChild(createInsertSlotElement(i));
                    if (i < gameState.sortedOrder.length) {
                        const cardEl = createCardElement(gameState.sortedOrder[i], i, 'sorted');
                        elements.cardAreaSorted.appendChild(cardEl);
                    }
                }
            } else {
                gameState.sortedOrder.forEach((card, index) => {
                    const cardEl = createCardElement(card, index, 'sorted');
                    elements.cardAreaSorted.appendChild(cardEl);
                });
            }
        }
    } else {
        elements.cardArea.innerHTML = '';
        gameState.currentOrder.forEach((card, index) => {
            const cardEl = createCardElement(card, index, 'inplace');
            elements.cardArea.appendChild(cardEl);
        });
    }
    updateCorrectIndicators();
}

// 創建卡片DOM（zone: 'inplace' | 'unsorted' | 'sorted'）
function createCardElement(card, index, zone) {
    zone = zone || 'inplace';
    const cardEl = document.createElement('div');
    cardEl.className = `card ${card.color} ${isFaceCard(card.rank) ? card.rank.toLowerCase() : ''}`;
    cardEl.dataset.index = String(index);
    cardEl.dataset.zone = zone;
    cardEl.id = zone === 'inplace' ? `card-${index}` : `card-${zone}-${index}`;

    cardEl.innerHTML = `
        <div class="rank">${card.rank}</div>
        <div class="suit">${card.suit}</div>
        <div class="rank-bottom">${card.rank}</div>
    `;

    cardEl.addEventListener('click', () => onCardClick(zone, index));

    return cardEl;
}

// 建立「插入位置」虛線格（額外空間模式）
function createInsertSlotElement(insertIndex) {
    const slotEl = document.createElement('div');
    slotEl.className = 'insert-slot';
    slotEl.dataset.zone = 'insert-slot';
    slotEl.dataset.index = String(insertIndex);
    slotEl.id = `insert-slot-${insertIndex}`;
    const dict = i18n[currentLang] || i18n['zh-TW'];
    const label = dict['status.insertHere'] || i18n['zh-TW']['status.insertHere'] || '插入這裡';
    slotEl.innerHTML = `<span class="insert-slot-label">${label}</span>`;
    slotEl.addEventListener('click', () => onCardClick('insert-slot', insertIndex));
    return slotEl;
}

function isFaceCard(rank) {
    return ['J', 'Q', 'K'].includes(rank);
}

// 卡片點擊事件（zone, index）- 原地模式為選擇與交換，額外空間模式為點擊未排序牌移到已排序
function onCardClick(zone, index) {
    if (!gameState.isGameActive) return;

    if (gameState.spaceMode === 'extraspace') {
        const dict = i18n[currentLang] || i18n['zh-TW'];
        // 點擊「插入格」：將已選的未排序牌插入該位置
        if (zone === 'insert-slot') {
            if (gameState.selectedUnsortedIndex < 0) return;
            const pos = Math.max(0, Math.min(index, gameState.sortedOrder.length));
            const card = gameState.unsortedOrder.splice(gameState.selectedUnsortedIndex, 1)[0];
            gameState.sortedOrder.splice(pos, 0, card);
            gameState.selectedUnsortedIndex = -1;
            gameState.comparisons++;
            gameState.swaps++;
            updateStats();
            renderCards();
            setTimeout(checkAnswer, 200);
            return;
        }
        // 點擊「未排序」區的牌：選定要插入的牌（再點下方虛線格插入）
        if (zone === 'unsorted') {
            if (index < 0 || index >= gameState.unsortedOrder.length) return;
            if (gameState.selectedUnsortedIndex === index) {
                gameState.selectedUnsortedIndex = -1;
                setStatus(dict['status.cancelInsert'] || i18n['zh-TW']['status.cancelInsert'], 'info');
            } else {
                gameState.selectedUnsortedIndex = index;
                const card = gameState.unsortedOrder[index];
                const tmpl = dict['status.selectInsertPos'] || i18n['zh-TW']['status.selectInsertPos'];
                setStatus(tmpl.replace('{card}', `${card.rank}${card.suit}`), 'info');
            }
            renderCards();
            return;
        }
        return;
    }

    // 原地排序模式
    gameState.comparisons++;
    const clickedCardEl = document.getElementById(`card-${index}`);

    if (gameState.selectedIndex === -1) {
        // 第一次點擊：選擇卡片
        gameState.selectedIndex = index;
        if (clickedCardEl) clickedCardEl.classList.add('selected');
        const dict = i18n[currentLang] || i18n['zh-TW'];
        const tmpl = dict['status.selectCard'] || i18n['zh-TW']['status.selectCard'];
        const msg = tmpl
            .replace('{index}', String(index + 1))
            .replace('{card}', getCardNameInplace(index));
        setStatus(msg, 'info');
    } else if (gameState.selectedIndex === index) {
        // 點選同一張：取消選擇
        if (clickedCardEl) clickedCardEl.classList.remove('selected');
        gameState.selectedIndex = -1;
        const dict = i18n[currentLang] || i18n['zh-TW'];
        setStatus(dict['status.cancelSelect'] || i18n['zh-TW']['status.cancelSelect'], 'info');
    } else {
        // 第二次點擊：交換兩張卡片
        const selectedIndex = gameState.selectedIndex;
        const selectedCardEl = document.getElementById(`card-${selectedIndex}`);

        swapCards(selectedIndex, index);

        if (selectedCardEl) selectedCardEl.classList.remove('selected');
        gameState.selectedIndex = -1;
        gameState.swaps++;
        updateStats();
        setTimeout(checkAnswer, 300);
    }
}

// 交換兩張卡片
function swapCards(index1, index2) {
    // 在資料結構中交換
    const temp = gameState.currentOrder[index1];
    gameState.currentOrder[index1] = gameState.currentOrder[index2];
    gameState.currentOrder[index2] = temp;

    // DOM 動畫交換
    const card1 = document.getElementById(`card-${index1}`);
    const card2 = document.getElementById(`card-${index2}`);

    // 添加交換動畫
    card1.classList.add('swapping');
    card2.classList.add('swapping');

    // 重新渲染（因為 index 會變，我們先更新 index 屬性再重新 render）
    // 但不立即重新 render，先做動畫
    setTimeout(() => {
        renderCards();
    }, 300);
}

// 取得卡片名稱（用於提示）- 原地模式用 currentOrder
function getCardNameInplace(index) {
    const card = gameState.currentOrder[index];
    if (!card) return '';
    return `${card.rank}${card.suit}`;
}

function getCardName(index) {
    return getCardNameInplace(index);
}

// 檢查答案
function checkAnswer() {
    if (!gameState.isGameActive) return;

    const expectedOrder = getExpectedOrder(gameState.currentSortMethod, gameState.cards);
    let isCorrect = true;

    if (gameState.spaceMode === 'extraspace') {
        if (gameState.unsortedOrder.length > 0 || gameState.sortedOrder.length !== expectedOrder.length) {
            isCorrect = false;
        } else {
            for (let i = 0; i < gameState.sortedOrder.length; i++) {
                if (!cardsMatchAtPosition(gameState.sortedOrder[i], expectedOrder[i])) {
                    isCorrect = false;
                    break;
                }
            }
        }
    } else {
        for (let i = 0; i < gameState.currentOrder.length; i++) {
            const cur = gameState.currentOrder[i];
            const exp = expectedOrder[i];
            if (!cardsMatchAtPosition(cur, exp)) {
                isCorrect = false;
                break;
            }
        }
    }

    if (isCorrect) {
        const efficiency = calculateEfficiency();
        const dict = i18n[currentLang] || i18n['zh-TW'];
        const tmpl = dict['status.correct'] || i18n['zh-TW']['status.correct'];
        const msg = tmpl
            .replace('{comparisons}', String(gameState.comparisons))
            .replace('{swaps}', String(gameState.swaps))
            .replace('{efficiency}', efficiency);
        setStatus(msg, 'success');
        showAlgorithmInfo('success');
    } else {
        const dict = i18n[currentLang] || i18n['zh-TW'];
        setStatus(dict['status.incorrect'] || i18n['zh-TW']['status.incorrect'], 'error');
    }

    updateProgress();
}

// 計算排序效率
function calculateEfficiency() {
    const n = gameState.cardCount;
    // bubble sort 最好情況：n-1 次比較，0 次交換
    // selection sort 固定：n*(n-1)/2 次比較，最多 n-1 次交換
    const optimal = n - 1;
    const compEfficiency = gameState.comparisons / optimal;
    let msg = '';
    if (compEfficiency < 1.2) {
        msg = '，效率很高！';
    } else if (compEfficiency < 2) {
        msg = '，表現不錯！';
    } else {
        msg = '，可以更有效率喔！';
    }
    return msg;
}

// 更新完成度百分比
function updateProgress() {
    const expectedOrder = getExpectedOrder(gameState.currentSortMethod, gameState.cards);
    let correctCount = 0;
    const total = gameState.cardCount;

    if (gameState.spaceMode === 'extraspace') {
        for (let i = 0; i < gameState.sortedOrder.length && i < expectedOrder.length; i++) {
            if (cardsMatchAtPosition(gameState.sortedOrder[i], expectedOrder[i])) correctCount++;
        }
    } else {
        for (let i = 0; i < gameState.currentOrder.length; i++) {
            if (cardsMatchAtPosition(gameState.currentOrder[i], expectedOrder[i])) correctCount++;
        }
    }

    const progress = total ? Math.round((correctCount / total) * 100) : 0;
    elements.progressDisplay.textContent = `${progress}%`;
}

// 依照目前排序與正解，標出已完成位置
function updateCorrectIndicators() {
    const clearAll = (container) => {
        if (!container) return;
        container.querySelectorAll('.card').forEach(cardEl => cardEl.classList.remove('card-correct'));
    };
    clearAll(elements.cardArea);
    clearAll(elements.cardAreaSorted);

    if (!elements.showCorrectToggle || !elements.showCorrectToggle.checked) {
        return;
    }
    if (!gameState.isGameActive || gameState.cards.length === 0 || gameState.currentSortMethod === 'none') {
        return;
    }

    const expectedOrder = getExpectedOrder(gameState.currentSortMethod, gameState.cards);

    if (gameState.spaceMode === 'extraspace') {
        for (let i = 0; i < gameState.sortedOrder.length && i < expectedOrder.length; i++) {
            if (cardsMatchAtPosition(gameState.sortedOrder[i], expectedOrder[i])) {
                const cardEl = document.getElementById(`card-sorted-${i}`);
                if (cardEl) cardEl.classList.add('card-correct');
            }
        }
    } else {
        for (let i = 0; i < gameState.currentOrder.length; i++) {
            if (cardsMatchAtPosition(gameState.currentOrder[i], expectedOrder[i])) {
                const cardEl = document.getElementById(`card-${i}`);
                if (cardEl) cardEl.classList.add('card-correct');
            }
        }
    }
}

// 比較某個位置的當前牌與期望牌是否視為「正確」
function cardsMatchAtPosition(currentCard, expectedCard) {
    if (!currentCard || !expectedCard) return false;
    // 若勾選「同數字不同花色也算正確」且為數字類排序，只看數字
    const numericMethods = ['number', 'number-asc', 'number-desc'];
    if (gameState.allowSameRankAnySuit && numericMethods.includes(gameState.currentSortMethod)) {
        return currentCard.value === expectedCard.value;
    }
    return currentCard.rank === expectedCard.rank && currentCard.suit === expectedCard.suit;
}

// 更新統計顯示
function updateStats() {
    elements.comparisonsDisplay.textContent = gameState.comparisons;
    elements.swapsDisplay.textContent = gameState.swaps;
    updateProgress();
}

// 獲取期望的排序結果
function getExpectedOrder(method, cards) {
    const sorted = [...cards];
    // 台灣慣用花色大小：黑桃 > 紅心 > 方塊 > 梅花
    const suitOrder = { '♠': 3, '♥': 2, '♦': 1, '♣': 0 };

    switch (method) {
        case 'number':
            // 主鍵：數字，由小到大；次鍵：花色（黑桃 > 紅心 > 方塊 > 梅花）
        case 'number-asc':
            sorted.sort((a, b) => {
                if (a.value !== b.value) return a.value - b.value;
                return suitOrder[a.suit] - suitOrder[b.suit];
            });
            break;
        case 'number-desc':
            sorted.sort((a, b) => {
                if (a.value !== b.value) return b.value - a.value;
                return suitOrder[a.suit] - suitOrder[b.suit];
            });
            break;
        case 'suit-symbol':
            sorted.sort((a, b) => {
                return suitOrder[a.suit] - suitOrder[b.suit];
            });
            break;
        case 'suit-color':
            sorted.sort((a, b) => {
                const colorWeight = { black: 0, red: 1 };
                return colorWeight[a.color] - colorWeight[b.color];
            });
            break;
        default:
            return cards;
    }

    return sorted;
}

// 顯示提示
function showHint() {
    if (!gameState.isGameActive || gameState.cards.length === 0) {
        const dictStart = i18n[currentLang] || i18n['zh-TW'];
        setStatus(dictStart['status.hintNeedStart'] || i18n['zh-TW']['status.hintNeedStart'], 'info');
        return;
    }

    const dict = i18n[currentLang] || i18n['zh-TW'];

    if (gameState.spaceMode === 'extraspace') {
        const expectedOrder = getExpectedOrder(gameState.currentSortMethod, gameState.cards);
        const nextPos = gameState.sortedOrder.length;
        if (nextPos >= expectedOrder.length) {
            setStatus(dict['status.hintPrefix'] + '已排序區已滿，請檢查答案。', 'info');
            return;
        }
        const nextExpected = expectedOrder[nextPos];
        const idx = gameState.unsortedOrder.findIndex(c => cardsMatchAtPosition(c, nextExpected));
        if (idx >= 0) {
            const card = gameState.unsortedOrder[idx];
            setStatus((dict['status.hintPrefix'] || '💡 ') + `建議點擊上方的「${card.rank}${card.suit}」移到已排序區。`, 'info');
        } else {
            setStatus((dict['status.hintPrefix'] || '💡 ') + '從上方未排序區依序選牌，放到下方已排序區。', 'info');
        }
        return;
    }

    const baseHintKeys = {
        'number': 'hint.number',
        'number-asc': 'hint.numberAsc',
        'number-desc': 'hint.numberDesc',
        'suit-symbol': 'hint.suitSymbol',
        'suit-color': 'hint.suitColor'
    };

    const expectedOrder = getExpectedOrder(gameState.currentSortMethod, gameState.cards);
    const current = gameState.currentOrder;

    // 找出第一個不在正確位置的索引，並給出具體交換建議
    let suggestedMessage = '';
    for (let i = 0; i < current.length; i++) {
        if (!cardsMatchAtPosition(current[i], expectedOrder[i])) {
            // 嘗試在後面找到應該放在這個位置的牌
            let j = i + 1;
            while (j < current.length) {
                if (cardsMatchAtPosition(current[j], expectedOrder[i])) break;
                j++;
            }

            if (j < current.length) {
                const tmplMove = dict['hint.moveExact'] || i18n['zh-TW']['hint.moveExact'];
                suggestedMessage = tmplMove
                    .replace('{from}', String(j + 1))
                    .replace('{to}', String(i + 1))
                    .replace('{card}', `${current[j].rank}${current[j].suit}`);
            } else {
                const tmplObs = dict['hint.observe'] || i18n['zh-TW']['hint.observe'];
                suggestedMessage = tmplObs
                    .replace('{index}', String(i + 1))
                    .replace('{card}', `${current[i].rank}${current[i].suit}`);
            }
            break;
        }
    }

    const baseKey = baseHintKeys[gameState.currentSortMethod];
    const base = baseKey ? (dict[baseKey] || i18n['zh-TW'][baseKey]) : '';
    const combined = suggestedMessage ? `${base} ${suggestedMessage}` : base;
    const prefix = dict['status.hintPrefix'] || i18n['zh-TW']['status.hintPrefix'];
    setStatus(prefix + combined, 'info');
}

// 重置本局：恢復此次發牌的原有模樣，不重新洗牌，讓學生重複練習同一組牌
function resetGame() {
    if (!gameState.isGameActive || gameState.cards.length === 0) return;

    gameState.comparisons = 0;
    gameState.swaps = 0;
    gameState.selectedIndex = -1;
    gameState.selectedUnsortedIndex = -1;

    if (gameState.spaceMode === 'extraspace') {
        gameState.unsortedOrder = [...gameState.cards];
        gameState.sortedOrder = [];
    } else {
        gameState.currentOrder = [...gameState.cards];
    }

    updateStats();
    renderCards();
    const dict = i18n[currentLang] || i18n['zh-TW'];
    setStatus(dict['status.resetDone'] || i18n['zh-TW']['status.resetDone'], 'info');
}

// 清除所有卡片
function clearCards() {
    elements.cardArea.innerHTML = '';
    if (elements.cardAreaUnsorted) elements.cardAreaUnsorted.innerHTML = '';
    if (elements.cardAreaSorted) elements.cardAreaSorted.innerHTML = '';
    gameState.cards = [];
    gameState.currentOrder = [];
    gameState.unsortedOrder = [];
    gameState.sortedOrder = [];
    gameState.selectedUnsortedIndex = -1;
    gameState.selectedIndex = -1;
    gameState.comparisons = 0;
    gameState.swaps = 0;
    updateStats();
}

// 更新狀態訊息
function setStatus(message, type = 'info') {
    elements.status.textContent = message;
    elements.status.className = `status ${type}`;
}

// 取得排序方法名稱
function getSortMethodName() {
    // 使用多國語言字典中的標籤
    const keyMap = {
        'number': 'controls.sortNumber',
        'number-asc': 'controls.sortNumberAsc',
        'number-desc': 'controls.sortNumberDesc',
        'suit-symbol': 'controls.sortSuitSymbol',
        'suit-color': 'controls.sortSuitColor'
    };
    const dict = i18n[currentLang] || i18n['zh-TW'];
    const labelKey = keyMap[gameState.currentSortMethod];
    if (!labelKey) return '';
    return dict[labelKey] || i18n['zh-TW'][labelKey] || '';
}

// 更新演算法資訊
function updateAlgorithmInfo(method) {
    const descMap = {
        'none': '選擇排序方式後，這裡會顯示相關的排序演算法概念。',
        'number': '數字的排序是比較排序的基礎。透過「比較 → 交換」步驟，將陣列由小到大排列。常見演算法：氣泡排序（相鄰交換）、選擇排序（找最小換到前面）。',
        'number-asc': '遞增排序列是最常見的排序目標。可以把這個過程想像成排隊：每次找出最小的數字，放到隊伍最前面，這就是「選擇排序」的想法。',
        'number-desc': '遞減排序只是方向相反，從大到小排。你可以從最左邊開始，不斷把目前看到最大的數字換到最左邊。',
        'suit-symbol': '花色排序使用預先約定好的順序（映射）。台灣常見習慣：黑桃(♠) > 紅心(♥) > 方塊(♦) > 梅花(♣)。可以想成每種花色都有一個「權重」。',
        'suit-color': '顏色分組是多重關鍵字排序的例子。先按顏色分兩大組（黑 → 紅），再在每組內按數字排序，這時「穩定排序」就很重要。'
    };

    const modeMap = {
        'none': '提示：先從少量牌開始，感受「比較 → 交換」的節奏。',
        'number': '建議練習模式：氣泡排序思維 —— 一直檢查相鄰兩張是否要交換。',
        'number-asc': '建議練習模式：選擇排序 —— 每回合幫「目前最小」找到正確位置。',
        'number-desc': '建議練習模式：選擇排序（反向）—— 每回合把「目前最大」換到最前面。',
        'suit-symbol': '思考：如果每種花色被指定一個數字（權重），排序就跟數字排序一樣了。',
        'suit-color': '思考：先按顏色分組，再按數字排序，這就是「兩階段排序」。'
    };

    const stepsMap = {
        'none': [
            '在上方選擇一種排序目標（例如：數字大小）。',
            '觀察目前牌的排列，想像「理想順序」應該長什麼樣子。',
            '點擊一張牌，再點擊另一張牌，完成一次交換。',
            '重複比較與交換，直到你覺得已經排好為止，再按「檢查答案」。'
        ],
        'number': [
            '從最左邊開始，依序看「一對相鄰的兩張牌」。',
            '如果左邊比右邊大，就交換它們的位置。',
            '走到最右邊時，最大的一張會被「氣泡」到最後面。',
            '重複上述步驟，多走幾輪，直到全部都排好。'
        ],
        'number-asc': [
            '從全部牌中找出目前最小的數字。',
            '把它換到最左邊的位置。',
            '接著在剩下的牌中，找出最小的數字，換到第二格。',
            '持續重複，直到所有位置都被正確的數字填滿。'
        ],
        'number-desc': [
            '從全部牌中找出目前最大的數字。',
            '把它換到最左邊的位置。',
            '在剩下的牌中繼續找最大值，依序往右排。',
            '完成後，整排牌會從大到小排列。'
        ],
        'suit-symbol': [
            '先記住花色順序：♠ > ♥ > ♦ > ♣（黑桃最大、梅花最小）。',
            '可以把每張牌換算成一個整數權重來想像。',
            '比較兩張牌時，就只是比較它們的權重大小。',
            '用跟數字排序一樣的方式完成整體排序。'
        ],
        'suit-color': [
            '先把所有「黑色」牌（♠,♣）集中到左邊。',
            '再把所有「紅色」牌（♥,♦）集中到右邊。',
            '如果想更進階，可以在每一組內再按照數字排序。'
        ]
    };

    elements.algorithmDesc.textContent = descMap[method] || descMap['none'];

    if (elements.algorithmMode) {
        elements.algorithmMode.textContent = modeMap[method] || modeMap['none'];
    }

    if (elements.algorithmSteps) {
        const steps = stepsMap[method] || stepsMap['none'];
        elements.algorithmSteps.innerHTML = '';
        steps.forEach(text => {
            const li = document.createElement('li');
            li.textContent = text;
            elements.algorithmSteps.appendChild(li);
        });
    }
}

function showAlgorithmInfo(type) {
    const successInfo = '⭐ 你做到了！你剛剛使用了一种「比較排序」的演算法。每一个交换都代表你比較了兩張牌的大小，並做出調整。';
    if (type === 'success') {
        setTimeout(() => {
            alert(successInfo);
        }, 500);
    }
}

// 啟動
init();
