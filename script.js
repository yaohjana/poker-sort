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
        'preset.guideTitle': '快速切換排序法：',
        'preset.selection': '選擇排序',
        'preset.insertion': '插入排序',
        'preset.bubble': '氣泡排序',
        'preset.quick': '快速排序',
        'preset.guideSelection': '🎯 <strong>選擇排序：</strong>從上方未排序區依序選出最小（或最大）的一張，點下方「最後一格」放入已排序區。',
        'preset.guideInsertion': '🎯 <strong>插入排序：</strong>從上方選一張牌，再點下方虛線格插入「正確位置」（比左小、比右大）。',
        'preset.guideBubble': '🎯 <strong>氣泡排序：</strong>只交換「相鄰」的兩張牌；每輪從左到右比較相鄰兩張，順序錯就交換，把較大者往右推。',
        'preset.guideQuick': '🎯 <strong>快速排序：</strong>先從「未分區」點一張牌當 pivot，再將其他牌點選後點「＜ pivot」或「＞ pivot」區域放入，體驗分區精髓。',
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
        'tabs.sortRef': '排序法對照',
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
        'algoRef.title': '📋 常見排序法：使用情境與複雜度',
        'algoRef.useCase': '使用情境',
        'algoRef.timeComplexity': '時間複雜度',
        'algoRef.spaceComplexity': '空間複雜度',
        'algoRef.selection.name': '選擇排序（找極值）',
        'algoRef.selection.scenario': '每輪從未排序區找最小（或最大），與當前位置交換。本程式：原地模式可「選一張與目標位置交換」；額外空間模式可從上方取一張放到下方最後一格。',
        'algoRef.selection.timeBest': '最好 O(n)',
        'algoRef.selection.timeAvg': '平均 O(n²)',
        'algoRef.selection.timeWorst': '最壞 O(n²)',
        'algoRef.selection.space': 'O(1) 原地',
        'algoRef.insertion.name': '插入排序（插對位置）',
        'algoRef.insertion.scenario': '每輪取未排序區一筆，插入已排序區的「正確位置」。本程式：額外空間模式，選上方一張牌，再點下方虛線格插入正確位置。',
        'algoRef.insertion.timeBest': '最好 O(n)',
        'algoRef.insertion.timeAvg': '平均 O(n²)',
        'algoRef.insertion.timeWorst': '最壞 O(n²)',
        'algoRef.insertion.space': 'O(1) 原地',
        'algoRef.bubble.name': '氣泡排序（相鄰交換）',
        'algoRef.bubble.scenario': '重複掃描，比較「相鄰」兩筆，順序錯就交換。本程式：原地模式，只交換相鄰的兩張牌，一輪輪把較大者往右推。',
        'algoRef.bubble.timeBest': '最好 O(n)',
        'algoRef.bubble.timeAvg': '平均 O(n²)',
        'algoRef.bubble.timeWorst': '最壞 O(n²)',
        'algoRef.bubble.space': 'O(1) 原地',
        'algoRef.quick.name': '快速排序（分治法）',
        'algoRef.quick.scenario': '選一筆當 pivot，小於的放左、大於的放右，再對左右兩邊遞迴。本程式：可先理解分治概念；實際分區操作較複雜，以說明與複雜度認識為主。',
        'algoRef.quick.timeBest': '最好 O(n log n)',
        'algoRef.quick.timeAvg': '平均 O(n log n)',
        'algoRef.quick.timeWorst': '最壞 O(n²)',
        'algoRef.quick.space': 'O(log n) 遞迴堆疊',
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
        'zone.quickUnpartitioned': '未分區（點一張當 pivot）',
        'zone.quickLeft': '＜ pivot',
        'zone.quickPivot': 'pivot',
        'zone.quickRight': '＞ pivot',
        'status.quickPickLeftRight': '請將未分區的牌點選後，點擊「＜ pivot」或「＞ pivot」區域放入',
        'status.quickSelectCard': '已選「{card}」，請點擊左側或右側區域放入',
        'status.quickPartitionDone': '🎉 分區完成！左側 ＜ pivot、右側 ＞ pivot。用了 {comparisons} 次比較、{swaps} 次移動。快速排序會對左、右兩組再遞迴做同樣步驟。',
        'quick.recurseLeft': '◀ 對左半部繼續分治',
        'quick.recurseRight': '對右半部繼續分治 ▶',
        'quick.nextGroup': '取下一組繼續',
        'quick.allDone': '🎉 全部分治完成！',
        'quick.finalOrderLabel': '最終順序：',
        'quick.essenceTip': '分區（選 pivot）→ 左半部遞迴 → 右半部遞迴 → 合併即有序',
        'quick.currentPath': '目前位置：',
        'quick.pathRoot': '根',
        'quick.branchLeft': '左',
        'quick.branchRight': '右',
        'quick.branchSplit': '切開',
        'quick.splitBoth': '✂ 中間切開，兩邊同時追蹤',
        'status.quickSplitHint': '左、右兩欄可分別操作，兩邊都完成即全部完成',
        'quick.colLeft': '左半部',
        'quick.colRight': '右半部',
        'quick.colDone': '✓ 本欄已完成',
        'quick.localFinalLabel': '本區塊排序結果：',
        'quick.pivotBaseline': '以 pivot 為基準：左小右大',
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
        'preset.guideTitle': '快速切换排序法：',
        'preset.selection': '选择排序',
        'preset.insertion': '插入排序',
        'preset.bubble': '冒泡排序',
        'preset.quick': '快速排序',
        'preset.guideSelection': '🎯 <strong>选择排序：</strong>从上方未排序区依序选出最小（或最大）的一张，点下方「最后一格」放入已排序区。',
        'preset.guideInsertion': '🎯 <strong>插入排序：</strong>从上方选一张牌，再点下方虚线格插入「正确位置」（比左小、比右大）。',
        'preset.guideBubble': '🎯 <strong>冒泡排序：</strong>只交换「相邻」的两张牌；每轮从左到右比较相邻两张，顺序错就交换，把较大者往右推。',
        'preset.guideQuick': '🎯 <strong>快速排序：</strong>先从「未分区」点一张牌当 pivot，再将其他牌点选后点「＜ pivot」或「＞ pivot」区域放入，体验分区精髓。',
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
        'tabs.sortRef': '排序法对照',
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
        'algoRef.title': '📋 常见排序法：使用情境与复杂度',
        'algoRef.useCase': '使用情境',
        'algoRef.timeComplexity': '时间复杂度',
        'algoRef.spaceComplexity': '空间复杂度',
        'algoRef.selection.name': '选择排序（找极值）',
        'algoRef.selection.scenario': '每轮从未排序区找最小（或最大），与当前位置交换。本程序：原地模式可「选一张与目标位置交换」；额外空间模式可从上方取一张放到下方最后一格。',
        'algoRef.selection.timeBest': '最好 O(n)',
        'algoRef.selection.timeAvg': '平均 O(n²)',
        'algoRef.selection.timeWorst': '最坏 O(n²)',
        'algoRef.selection.space': 'O(1) 原地',
        'algoRef.insertion.name': '插入排序（插对位置）',
        'algoRef.insertion.scenario': '每轮取未排序区一笔，插入已排序区的「正确位置」。本程序：额外空间模式，选上方一张牌，再点下方虚线格插入正确位置。',
        'algoRef.insertion.timeBest': '最好 O(n)',
        'algoRef.insertion.timeAvg': '平均 O(n²)',
        'algoRef.insertion.timeWorst': '最坏 O(n²)',
        'algoRef.insertion.space': 'O(1) 原地',
        'algoRef.bubble.name': '冒泡排序（相邻交换）',
        'algoRef.bubble.scenario': '重复扫描，比较「相邻」两笔，顺序错就交换。本程序：原地模式，只交换相邻的两张牌，一轮轮把较大者往右推。',
        'algoRef.bubble.timeBest': '最好 O(n)',
        'algoRef.bubble.timeAvg': '平均 O(n²)',
        'algoRef.bubble.timeWorst': '最坏 O(n²)',
        'algoRef.bubble.space': 'O(1) 原地',
        'algoRef.quick.name': '快速排序（分治法）',
        'algoRef.quick.scenario': '选一笔当 pivot，小于的放左、大于的放右，再对左右两边递归。本程序：可先理解分治概念；实际分区操作较复杂，以说明与复杂度认识为主。',
        'algoRef.quick.timeBest': '最好 O(n log n)',
        'algoRef.quick.timeAvg': '平均 O(n log n)',
        'algoRef.quick.timeWorst': '最坏 O(n²)',
        'algoRef.quick.space': 'O(log n) 递归堆栈',
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
        'zone.quickUnpartitioned': '未分区（点一张当 pivot）',
        'zone.quickLeft': '＜ pivot',
        'zone.quickPivot': 'pivot',
        'zone.quickRight': '＞ pivot',
        'status.quickPickLeftRight': '请将未分区的牌点选后，点击「＜ pivot」或「＞ pivot」区域放入',
        'status.quickSelectCard': '已选「{card}」，请点击左侧或右侧区域放入',
        'status.quickPartitionDone': '🎉 分区完成！左侧 ＜ pivot、右侧 ＞ pivot。用了 {comparisons} 次比较、{swaps} 次移动。快速排序会对左、右两组再递归做同样步骤。',
        'quick.recurseLeft': '◀ 对左半部继续分治',
        'quick.recurseRight': '对右半部继续分治 ▶',
        'quick.nextGroup': '取下一组继续',
        'quick.allDone': '🎉 全部分治完成！',
        'quick.finalOrderLabel': '最终顺序：',
        'quick.essenceTip': '分区（选 pivot）→ 左半部递迴 → 右半部递迴 → 合并即有序',
        'quick.currentPath': '当前位置：',
        'quick.pathRoot': '根',
        'quick.branchLeft': '左',
        'quick.branchRight': '右',
        'quick.branchSplit': '切开',
        'quick.splitBoth': '✂ 中间切开，两边同时追踪',
        'status.quickSplitHint': '左、右两栏可分别操作，两边都完成即全部完成',
        'quick.colLeft': '左半部',
        'quick.colRight': '右半部',
        'quick.colDone': '✓ 本栏已完成',
        'quick.localFinalLabel': '本区块排序结果：',
        'quick.pivotBaseline': '以 pivot 为基准：左小右大',
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
        'preset.guideTitle': 'Quick sort method:',
        'preset.selection': 'Selection',
        'preset.insertion': 'Insertion',
        'preset.bubble': 'Bubble',
        'preset.quick': 'Quick',
        'preset.guideSelection': '🎯 <strong>Selection sort:</strong> From the unsorted area above, pick the smallest (or largest) each time and put it in the <strong>last slot</strong> below.',
        'preset.guideInsertion': '🎯 <strong>Insertion sort:</strong> Pick a card above, then click a dashed slot below to insert at the <strong>correct position</strong> (smaller than right, larger than left).',
        'preset.guideBubble': '🎯 <strong>Bubble sort:</strong> Only swap <strong>adjacent</strong> cards; each pass compare left to right and swap if out of order, pushing the larger rightward.',
        'preset.guideQuick': '🎯 <strong>Quick sort:</strong> Click one card in “Unpartitioned” as pivot, then select other cards and click the 「＜ pivot」 or 「＞ pivot」 area to place them.',
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
        'tabs.sortRef': 'Sort methods',
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
        'algoRef.title': '📋 Common sort methods: use cases & complexity',
        'algoRef.useCase': 'Use case',
        'algoRef.timeComplexity': 'Time complexity',
        'algoRef.spaceComplexity': 'Space complexity',
        'algoRef.selection.name': 'Selection sort (find min/max)',
        'algoRef.selection.scenario': 'Each round, find the smallest (or largest) in the unsorted part and swap with the current position. In this app: in-place mode, swap one card to the target slot; extra-space mode, take one from above and put it in the last slot below.',
        'algoRef.selection.timeBest': 'Best O(n)',
        'algoRef.selection.timeAvg': 'Average O(n²)',
        'algoRef.selection.timeWorst': 'Worst O(n²)',
        'algoRef.selection.space': 'O(1) in-place',
        'algoRef.insertion.name': 'Insertion sort (insert at right place)',
        'algoRef.insertion.scenario': 'Each round, take one from the unsorted part and insert it into the correct position in the sorted part. In this app: extra-space mode, pick a card above and click a dashed slot below to insert.',
        'algoRef.insertion.timeBest': 'Best O(n)',
        'algoRef.insertion.timeAvg': 'Average O(n²)',
        'algoRef.insertion.timeWorst': 'Worst O(n²)',
        'algoRef.insertion.space': 'O(1) in-place',
        'algoRef.bubble.name': 'Bubble sort (adjacent swap)',
        'algoRef.bubble.scenario': 'Repeatedly scan and compare adjacent pairs; swap if out of order. In this app: in-place mode, only swap two adjacent cards and push the larger rightward each pass.',
        'algoRef.bubble.timeBest': 'Best O(n)',
        'algoRef.bubble.timeAvg': 'Average O(n²)',
        'algoRef.bubble.timeWorst': 'Worst O(n²)',
        'algoRef.bubble.space': 'O(1) in-place',
        'algoRef.quick.name': 'Quick sort (divide & conquer)',
        'algoRef.quick.scenario': 'Pick a pivot; put smaller elements on the left and larger on the right; recurse on both sides. In this app: focus on understanding the idea; full partitioning is not simulated here.',
        'algoRef.quick.timeBest': 'Best O(n log n)',
        'algoRef.quick.timeAvg': 'Average O(n log n)',
        'algoRef.quick.timeWorst': 'Worst O(n²)',
        'algoRef.quick.space': 'O(log n) recursion stack',
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
        'zone.quickUnpartitioned': 'Unpartitioned (click one as pivot)',
        'zone.quickLeft': '＜ pivot',
        'zone.quickPivot': 'pivot',
        'zone.quickRight': '＞ pivot',
        'status.quickPickLeftRight': 'Select a card above, then click the 「＜ pivot」 or 「＞ pivot」 area to place it.',
        'status.quickSelectCard': 'Selected 「{card}」. Click the left or right area to place it.',
        'status.quickPartitionDone': '🎉 Partition done! Left ＜ pivot, right ＞ pivot. Used {comparisons} comparisons, {swaps} moves. Quick sort then recurses on left and right.',
        'quick.recurseLeft': '◀ Recurse on left',
        'quick.recurseRight': 'Recurse on right ▶',
        'quick.nextGroup': 'Next group',
        'quick.allDone': '🎉 All done!',
        'quick.finalOrderLabel': 'Final order: ',
        'quick.essenceTip': 'Partition (pick pivot) → recurse left → recurse right → merged order',
        'quick.currentPath': 'Current path: ',
        'quick.pathRoot': 'root',
        'quick.branchLeft': 'L',
        'quick.branchRight': 'R',
        'quick.branchSplit': 'split',
        'quick.splitBoth': '✂ Split both, track both sides',
        'status.quickSplitHint': 'Work on left and right columns; when both are done, all done.',
        'quick.colLeft': 'Left',
        'quick.colRight': 'Right',
        'quick.colDone': '✓ This column done',
        'quick.localFinalLabel': 'Local result of this block:',
        'quick.pivotBaseline': 'Pivot as baseline: smaller left, larger right',
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
        'preset.guideTitle': '並べ替え法を切り替え：',
        'preset.selection': '選択ソート',
        'preset.insertion': '挿入ソート',
        'preset.bubble': 'バブルソート',
        'preset.quick': 'クイックソート',
        'preset.guideSelection': '🎯 <strong>選択ソート：</strong>上の未ソートから毎回最小（または最大）を1枚選び、下の「最後の枠」に入れます。',
        'preset.guideInsertion': '🎯 <strong>挿入ソート：</strong>上のカードを1枚選び、下の点線枠をクリックして「正しい位置」（左より大、右より小）に挿入。',
        'preset.guideBubble': '🎯 <strong>バブルソート：</strong>「隣同士」の2枚だけ交換。左から右へ比較し、順序が逆なら交換して大きいものを右へ。',
        'preset.guideQuick': '🎯 <strong>クイックソート：</strong>「未分区」から1枚クリックして pivot に。他は選んで「＜ pivot」「＞ pivot」の領域をクリックして入れます。',
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
        'tabs.sortRef': '並べ替え法対照',
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
        'algoRef.title': '📋 主な並べ替え法：使用場面と計算量',
        'algoRef.useCase': '使用情境',
        'algoRef.timeComplexity': '時間計算量',
        'algoRef.spaceComplexity': '空間計算量',
        'algoRef.selection.name': '選択ソート（極値を選ぶ）',
        'algoRef.selection.scenario': '各ラウンドで未ソート部分から最小（または最大）を選び、現在位置と入れ替え。本アプリ：インプレースでは「1枚選んで目標位置と交換」、追加領域では上から1枚取って下の最後の枠に置く。',
        'algoRef.selection.timeBest': '最良 O(n)',
        'algoRef.selection.timeAvg': '平均 O(n²)',
        'algoRef.selection.timeWorst': '最悪 O(n²)',
        'algoRef.selection.space': 'O(1) インプレース',
        'algoRef.insertion.name': '挿入ソート（正しい位置に挿入）',
        'algoRef.insertion.scenario': '各ラウンドで未ソート部分から1枚取り、ソート済み部分の「正しい位置」に挿入。本アプリ：追加領域モードで上のカードを1枚選び、下の点線枠をクリックして挿入。',
        'algoRef.insertion.timeBest': '最良 O(n)',
        'algoRef.insertion.timeAvg': '平均 O(n²)',
        'algoRef.insertion.timeWorst': '最悪 O(n²)',
        'algoRef.insertion.space': 'O(1) インプレース',
        'algoRef.bubble.name': 'バブルソート（隣同士を交換）',
        'algoRef.bubble.scenario': '繰り返しスキャンし、「隣同士」を比較、順序が逆なら交換。本アプリ：インプレースモードで隣り合う2枚だけ交換し、大きいものを右へ押し出す。',
        'algoRef.bubble.timeBest': '最良 O(n)',
        'algoRef.bubble.timeAvg': '平均 O(n²)',
        'algoRef.bubble.timeWorst': '最悪 O(n²)',
        'algoRef.bubble.space': 'O(1) インプレース',
        'algoRef.quick.name': 'クイックソート（分割統治法）',
        'algoRef.quick.scenario': 'pivot を1つ選び、それより小さいものを左、大きいものを右に分け、左右それぞれを再帰的にソート。本アプリ：分割の概念の理解が中心。実際の分区操作はここではシミュレートしていません。',
        'algoRef.quick.timeBest': '最良 O(n log n)',
        'algoRef.quick.timeAvg': '平均 O(n log n)',
        'algoRef.quick.timeWorst': '最悪 O(n²)',
        'algoRef.quick.space': 'O(log n) 再帰スタック',
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
        'zone.quickUnpartitioned': '未分区（1枚クリックで pivot に）',
        'zone.quickLeft': '＜ pivot',
        'zone.quickPivot': 'pivot',
        'zone.quickRight': '＞ pivot',
        'status.quickPickLeftRight': '未分区のカードを選んでから、「＜ pivot」または「＞ pivot」の領域をクリックして入れます。',
        'status.quickSelectCard': '「{card}」を選択しました。左または右の領域をクリックして入れましょう。',
        'status.quickPartitionDone': '🎉 分区完了！左 ＜ pivot、右 ＞ pivot。比較 {comparisons} 回・移動 {swaps} 回。クイックソートは左・右それぞれに同じ手順を再帰します。',
        'quick.recurseLeft': '◀ 左半部を続ける',
        'quick.recurseRight': '右半部を続ける ▶',
        'quick.nextGroup': '次のグループへ',
        'quick.allDone': '🎉 すべて完了！',
        'quick.finalOrderLabel': '最終順序：',
        'quick.essenceTip': '分区（pivot 選択）→ 左再帰 → 右再帰 → 併合で整列',
        'quick.currentPath': '現在位置：',
        'quick.pathRoot': '根',
        'quick.branchLeft': '左',
        'quick.branchRight': '右',
        'quick.branchSplit': '分割',
        'quick.splitBoth': '✂ 中央で分割、両方追跡',
        'status.quickSplitHint': '左・右の欄をそれぞれ操作。両方完了で全体完了。',
        'quick.colLeft': '左半分',
        'quick.colRight': '右半分',
        'quick.colDone': '✓ この欄完了',
        'quick.localFinalLabel': 'このブロックの結果：',
        'quick.pivotBaseline': 'pivot を基準に：左が小さく、右が大きく',
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
    // 操作方式小提示（依模式、語言與快速切換預設更新）
    if (elements.instructionHint) {
        const hintP = elements.instructionHint.querySelector('p');
        if (hintP) {
            const guideKeys = { selection: 'preset.guideSelection', insertion: 'preset.guideInsertion', bubble: 'preset.guideBubble', quick: 'preset.guideQuick' };
            const presetKey = gameState.preset ? guideKeys[gameState.preset] : null;
            const key = presetKey || (gameState.spaceMode === 'extraspace' ? 'banner.hintExtraspace' : 'banner.hint');
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
    if (gameState.spaceMode === 'quicksort') {
        if (gameState.quickSplitMode) {
            const lb = gameState.quickLeftBranch, rb = gameState.quickRightBranch;
            const selBranch = (lb && lb.selectedIndex >= 0 && (lb.unpartitioned || [])[lb.selectedIndex]) ? lb : (rb && rb.selectedIndex >= 0 && (rb.unpartitioned || [])[rb.selectedIndex]) ? rb : null;
            if (selBranch) {
                const card = selBranch.unpartitioned[selBranch.selectedIndex];
                elements.status.textContent = (dict['status.quickSelectCard'] || '已選「{card}」，請點擊左側或右側區域放入').replace('{card}', `${card.rank}${card.suit}`);
            } else {
                elements.status.textContent = dict['status.quickSplitHint'] || '左、右兩欄可分別操作，兩邊都完成即全部完成';
            }
        } else if (gameState.selectedQuickIndex >= 0 && gameState.quickUnpartitioned[gameState.selectedQuickIndex]) {
            const card = gameState.quickUnpartitioned[gameState.selectedQuickIndex];
            elements.status.textContent = (dict['status.quickSelectCard'] || '已選「{card}」，請點擊左側或右側區域放入').replace('{card}', `${card.rank}${card.suit}`);
        } else {
            elements.status.textContent = dict['status.quickPickLeftRight'] || '請將未分區的牌點選後，點擊「＜ pivot」或「＞ pivot」區域放入';
        }
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
    spaceMode: 'inplace', // 'inplace' | 'extraspace' | 'quicksort'
    preset: null,
    // 快速排序專用
    quickUnpartitioned: [],
    quickLeft: [],
    quickPivot: null,    // 單張牌或 null
    quickRight: [],
    selectedQuickIndex: -1,
    quickStack: [],        // 分治遞迴：尚未處理的「右半部」群組堆疊
    quickPartitionHistory: [], // 已完成的分區區塊 { left, pivot, right, depth, branch }
    quickPath: [],           // 目前遞迴路徑 ['L'|'R'...]，用於樹狀顯示與「目前位置」
    quickResultOrder: [],     // 分治完成時依序收集的片段，最後合併為最終排序
    quickSplitMode: false,    // 是否為「中間切開」雙欄模式
    quickLeftBranch: null,   // 左欄 { unpartitioned, left, pivot, right, stack, history, path, resultOrder, selectedIndex }
    quickRightBranch: null,  // 右欄（同上）
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
    cardZonesQuickspace: document.getElementById('card-zones-quickspace'),
    cardArea: document.getElementById('card-area'),
    cardAreaUnsorted: document.getElementById('card-area-unsorted'),
    cardAreaSorted: document.getElementById('card-area-sorted'),
    cardAreaQuickUnpartitioned: document.getElementById('card-area-quick-unpartitioned'),
    cardAreaQuickLeft: document.getElementById('card-area-quick-left'),
    cardAreaQuickPivot: document.getElementById('card-area-quick-pivot'),
    cardAreaQuickRight: document.getElementById('card-area-quick-right'),
    quicksortRecurseButtons: document.getElementById('quicksort-recurse-buttons'),
    quicksortPartitionHistory: document.getElementById('quicksort-partition-history'),
    quicksortSingleView: document.getElementById('quicksort-single-view'),
    quicksortSplitContainer: document.getElementById('quicksort-split-container'),
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
            gameState.preset = null;
            switchSpaceModeUI(gameState.spaceMode);
            document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('preset-btn-active'));
            if (gameState.isGameActive && gameState.cards.length > 0) {
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

    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const preset = btn.getAttribute('data-preset');
            if (preset) applyPreset(preset);
        });
    });

    if (elements.cardAreaQuickLeft) {
        elements.cardAreaQuickLeft.addEventListener('click', (e) => {
            if (gameState.spaceMode !== 'quicksort' || gameState.selectedQuickIndex < 0) return;
            if (e.target.closest('.card')) return;
            moveQuickSelectedTo('left');
        });
    }
    if (elements.cardAreaQuickRight) {
        elements.cardAreaQuickRight.addEventListener('click', (e) => {
            if (gameState.spaceMode !== 'quicksort' || gameState.selectedQuickIndex < 0) return;
            if (e.target.closest('.card')) return;
            moveQuickSelectedTo('right');
        });
    }
}

function moveQuickSelectedTo(side) {
    if (gameState.selectedQuickIndex < 0 || gameState.selectedQuickIndex >= gameState.quickUnpartitioned.length) return;
    const card = gameState.quickUnpartitioned.splice(gameState.selectedQuickIndex, 1)[0];
    if (side === 'left') gameState.quickLeft.push(card);
    else gameState.quickRight.push(card);
    gameState.selectedQuickIndex = -1;
    gameState.comparisons++;
    gameState.swaps++;
    updateStats();
    renderCards();
    const dict = i18n[currentLang] || i18n['zh-TW'];
    setStatus(dict['status.quickPickLeftRight'] || '請將未分區的牌點選後，點擊「＜ pivot」或「＞ pivot」區域放入', 'info');
    setTimeout(checkQuickPartitionDone, 0);
}

function checkQuickPartitionDone() {
    if (gameState.spaceMode !== 'quicksort' || gameState.quickUnpartitioned.length > 0 || !gameState.quickPivot) return;
    checkAnswer();
}

function createEmptyBranch() {
    return {
        unpartitioned: [],
        left: [],
        pivot: null,
        right: [],
        stack: [],
        history: [],
        path: [],
        resultOrder: [],
        selectedIndex: -1,
        doneAppended: false
    };
}

function clearQuickRecurseButtons() {
    if (!elements.quicksortRecurseButtons) return;
    elements.quicksortRecurseButtons.innerHTML = '';
    elements.quicksortRecurseButtons.style.display = 'none';
}

function showQuickRecurseButtons() {
    if (!elements.quicksortRecurseButtons || gameState.spaceMode !== 'quicksort') return;
    const dict = i18n[currentLang] || i18n['zh-TW'];
    const leftCount = gameState.quickLeft.length;
    const rightCount = gameState.quickRight.length;
    elements.quicksortRecurseButtons.innerHTML = '';
    elements.quicksortRecurseButtons.style.display = 'block';

    if (leftCount >= 2 && rightCount >= 2) {
        const splitBtn = document.createElement('button');
        splitBtn.type = 'button';
        splitBtn.className = 'btn preset-btn quicksort-recurse-btn quicksort-split-btn';
        splitBtn.textContent = dict['quick.splitBoth'] || '✂ 中間切開，兩邊同時追蹤';
        splitBtn.addEventListener('click', () => {
            gameState.quickPartitionHistory.push({
                left: [...gameState.quickLeft],
                pivot: gameState.quickPivot,
                right: [...gameState.quickRight],
                depth: gameState.quickPath.length,
                branch: 'split'
            });
            gameState.quickSplitMode = true;
            gameState.quickLeftBranch = createEmptyBranch();
            gameState.quickRightBranch = createEmptyBranch();
            gameState.quickLeftBranch.unpartitioned = [...gameState.quickLeft];
            gameState.quickLeftBranch.path = [...gameState.quickPath, 'L'];
            gameState.quickRightBranch.unpartitioned = [...gameState.quickRight];
            gameState.quickRightBranch.path = [...gameState.quickPath, 'R'];
            gameState.quickUnpartitioned = [];
            gameState.quickLeft = [];
            gameState.quickPivot = null;
            gameState.quickRight = [];
            clearQuickRecurseButtons();
            renderCards();
            setStatus(dict['status.quickSplitHint'] || '左、右兩欄可分別操作，兩邊都完成即全部完成', 'info');
        });
        elements.quicksortRecurseButtons.appendChild(splitBtn);
    }
    if (leftCount >= 2) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn preset-btn quicksort-recurse-btn';
        btn.textContent = dict['quick.recurseLeft'] || '◀ 對左半部繼續分治';
        btn.addEventListener('click', () => {
            gameState.quickPartitionHistory.push({
                left: [...gameState.quickLeft],
                pivot: gameState.quickPivot,
                right: [...gameState.quickRight],
                depth: gameState.quickPath.length,
                branch: 'left'
            });
            gameState.quickPath.push('L');
            gameState.quickStack.push([...gameState.quickRight]);
            gameState.quickUnpartitioned = [...gameState.quickLeft];
            gameState.quickLeft = [];
            gameState.quickPivot = null;
            gameState.quickRight = [];
            clearQuickRecurseButtons();
            renderCards();
            setStatus(dict['status.quickPickLeftRight'] || '請將未分區的牌點選後，點擊「＜ pivot」或「＞ pivot」區域放入', 'info');
        });
        elements.quicksortRecurseButtons.appendChild(btn);
    }
    if (rightCount >= 2) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn preset-btn quicksort-recurse-btn';
        btn.textContent = dict['quick.recurseRight'] || '對右半部繼續分治 ▶';
        btn.addEventListener('click', () => {
            gameState.quickPartitionHistory.push({
                left: [...gameState.quickLeft],
                pivot: gameState.quickPivot,
                right: [...gameState.quickRight],
                depth: gameState.quickPath.length,
                branch: 'right'
            });
            gameState.quickPath.push('R');
            gameState.quickUnpartitioned = [...gameState.quickRight];
            gameState.quickLeft = [];
            gameState.quickPivot = null;
            gameState.quickRight = [];
            clearQuickRecurseButtons();
            renderCards();
            setStatus(dict['status.quickPickLeftRight'] || '請將未分區的牌點選後，點擊「＜ pivot」或「＞ pivot」區域放入', 'info');
        });
        elements.quicksortRecurseButtons.appendChild(btn);
    }
    if (leftCount <= 1 && rightCount <= 1) {
        if (gameState.quickStack.length > 0) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'btn preset-btn quicksort-recurse-btn';
            btn.textContent = dict['quick.nextGroup'] || '取下一組繼續';
            btn.addEventListener('click', () => {
                appendQuickSegment();
                gameState.quickPath.pop();
                gameState.quickPath.push('R');
                gameState.quickUnpartitioned = gameState.quickStack.pop();
                gameState.quickLeft = [];
                gameState.quickPivot = null;
                gameState.quickRight = [];
                clearQuickRecurseButtons();
                renderCards();
                setStatus(dict['status.quickPickLeftRight'] || '請將未分區的牌點選後，點擊「＜ pivot」或「＞ pivot」區域放入', 'info');
            });
            elements.quicksortRecurseButtons.appendChild(btn);
        } else {
            appendQuickSegment();
            const wrap = document.createElement('div');
            wrap.className = 'quicksort-all-done-wrap';
            const span = document.createElement('span');
            span.className = 'quicksort-all-done';
            span.textContent = dict['quick.allDone'] || '🎉 全部分治完成！';
            wrap.appendChild(span);
            const finalOrderEl = document.createElement('div');
            finalOrderEl.className = 'quicksort-final-order';
            finalOrderEl.setAttribute('aria-label', dict['quick.finalOrderLabel'] || '最終順序');
            const label = document.createElement('div');
            label.className = 'quicksort-final-order-label';
            label.textContent = dict['quick.finalOrderLabel'] || '最終順序：';
            finalOrderEl.appendChild(label);
            const cardsRow = document.createElement('div');
            cardsRow.className = 'quicksort-final-order-cards';
            const finalOrder = getExpectedOrder(gameState.currentSortMethod, gameState.cards);
            finalOrder.forEach((card, i) => {
                const el = createCardElement(card, i, 'quick-final', true);
                el.classList.add('card-final-correct');
                const orderLabel = document.createElement('div');
                orderLabel.className = 'card-order-label';
                orderLabel.textContent = String(i + 1);
                el.appendChild(orderLabel);
                cardsRow.appendChild(el);
            });
            finalOrderEl.appendChild(cardsRow);
            wrap.appendChild(finalOrderEl);
            elements.quicksortRecurseButtons.appendChild(wrap);
        }
    }
}

function appendQuickSegment() {
    const left = gameState.quickLeft || [];
    const pivot = gameState.quickPivot;
    const right = gameState.quickRight || [];
    if (pivot) gameState.quickResultOrder.push(...left, pivot, ...right);
}

function getQuickFinalOrder() {
    return [...(gameState.quickResultOrder || [])];
}

function getBranch(branchId) {
    return branchId === 'left' ? gameState.quickLeftBranch : gameState.quickRightBranch;
}

function appendBranchSegment(branch) {
    if (!branch || !branch.pivot) return;
    branch.resultOrder.push(...(branch.left || []), branch.pivot, ...(branch.right || []));
}

function isBranchDone(branch) {
    if (!branch) return true;
    const l = (branch.left || []).length, r = (branch.right || []).length;
    return l <= 1 && r <= 1 && (branch.stack || []).length === 0;
}

function moveQuickSelectedToBranch(branchId, side) {
    const branch = getBranch(branchId);
    if (!branch || branch.selectedIndex < 0 || branch.selectedIndex >= (branch.unpartitioned || []).length) return;
    const card = branch.unpartitioned.splice(branch.selectedIndex, 1)[0];
    if (side === 'left') branch.left.push(card);
    else branch.right.push(card);
    branch.selectedIndex = -1;
    gameState.comparisons++;
    gameState.swaps++;
    updateStats();
    renderCards();
    const dict = i18n[currentLang] || i18n['zh-TW'];
    setStatus(dict['status.quickPickLeftRight'] || '請將未分區的牌點選後，點擊「＜ pivot」或「＞ pivot」區域放入', 'info');
}

function renderQuickSplitView() {
    if (!elements.quicksortSplitContainer || !gameState.quickLeftBranch || !gameState.quickRightBranch) return;
    const dict = i18n[currentLang] || i18n['zh-TW'];
    const leftDone = isBranchDone(gameState.quickLeftBranch);
    const rightDone = isBranchDone(gameState.quickRightBranch);
    if (leftDone && rightDone) {
        const finalOrder = getExpectedOrder(gameState.currentSortMethod, gameState.cards);
        const wrap = document.createElement('div');
        wrap.className = 'quicksort-split-all-done';
        wrap.innerHTML = '<span class="quicksort-all-done">' + (dict['quick.allDone'] || '🎉 全部分治完成！') + '</span>';
        const finalOrderEl = document.createElement('div');
        finalOrderEl.className = 'quicksort-final-order';
        const label = document.createElement('div');
        label.className = 'quicksort-final-order-label';
        label.textContent = dict['quick.finalOrderLabel'] || '最終順序：';
        finalOrderEl.appendChild(label);
        const cardsRow = document.createElement('div');
        cardsRow.className = 'quicksort-final-order-cards';
        finalOrder.forEach((card, i) => {
            const el = createCardElement(card, i, 'quick-final', true);
            el.classList.add('card-final-correct');
            const orderLabel = document.createElement('div');
            orderLabel.className = 'card-order-label';
            orderLabel.textContent = String(i + 1);
            el.appendChild(orderLabel);
            cardsRow.appendChild(el);
        });
        finalOrderEl.appendChild(cardsRow);
        wrap.appendChild(finalOrderEl);
        elements.quicksortSplitContainer.appendChild(wrap);
        return;
    }
    const row = document.createElement('div');
    row.className = 'quicksort-split-row';
    ['left', 'right'].forEach(branchId => {
        const branch = getBranch(branchId);
        const col = document.createElement('div');
        col.className = 'quicksort-split-col';
        col.dataset.branch = branchId;
        const title = document.createElement('div');
        title.className = 'quicksort-split-col-title';
        title.textContent = branchId === 'left' ? (dict['quick.colLeft'] || '左半部') : (dict['quick.colRight'] || '右半部');
        col.appendChild(title);
        const unpartBlock = document.createElement('div');
        unpartBlock.className = 'zone-block';
        unpartBlock.innerHTML = '<div class="zone-label">' + (dict['zone.quickUnpartitioned'] || '未分區') + '</div><div class="card-area quicksort-split-unpartitioned" data-branch="' + branchId + '"></div>';
        const unpartArea = unpartBlock.querySelector('.card-area');
        (branch.unpartitioned || []).forEach((card, i) => {
            const zone = 'quick-split-' + branchId + '-unpartitioned';
            const el = createCardElement(card, i, zone, false);
            if (i === branch.selectedIndex) el.classList.add('selected');
            unpartArea.appendChild(el);
        });
        col.appendChild(unpartBlock);
        const partWrap = document.createElement('div');
        partWrap.className = 'quicksort-partition-row-wrap';
        const baselineLabel = document.createElement('div');
        baselineLabel.className = 'quicksort-partition-baseline-label';
        baselineLabel.textContent = dict['quick.pivotBaseline'] || '以 pivot 為基準：左小右大';
        partWrap.appendChild(baselineLabel);
        const partRow = document.createElement('div');
        partRow.className = 'quicksort-partition-row quicksort-split-partition-row';
        const leftBlock = document.createElement('div');
        leftBlock.className = 'zone-block zone-block-quick zone-block-quick-left';
        leftBlock.innerHTML = '<div class="zone-label">＜ pivot</div><div class="card-area quicksort-split-zone-left" data-branch="' + branchId + '" data-side="left"></div>';
        const leftArea = leftBlock.querySelector('.card-area');
        (branch.left || []).forEach((card, i) => leftArea.appendChild(createCardElement(card, i, 'quick-left', true)));
        leftArea.addEventListener('click', (e) => { if (!e.target.closest('.card')) moveQuickSelectedToBranch(branchId, 'left'); });
        const pivotBlock = document.createElement('div');
        pivotBlock.className = 'zone-block zone-block-pivot';
        pivotBlock.innerHTML = '<div class="zone-label">pivot</div><div class="card-area"></div>';
        const pivotArea = pivotBlock.querySelector('.card-area');
        if (branch.pivot) pivotArea.appendChild(createCardElement(branch.pivot, 0, 'quick-pivot', true));
        const rightBlock = document.createElement('div');
        rightBlock.className = 'zone-block zone-block-quick';
        rightBlock.innerHTML = '<div class="zone-label">＞ pivot</div><div class="card-area quicksort-split-zone-right" data-branch="' + branchId + '" data-side="right"></div>';
        const rightArea = rightBlock.querySelector('.card-area');
        (branch.right || []).forEach((card, i) => rightArea.appendChild(createCardElement(card, i, 'quick-right', true)));
        rightArea.addEventListener('click', (e) => { if (!e.target.closest('.card')) moveQuickSelectedToBranch(branchId, 'right'); });
        rightBlock.className = 'zone-block zone-block-quick zone-block-quick-right';
        partRow.appendChild(leftBlock);
        partRow.appendChild(pivotBlock);
        partRow.appendChild(rightBlock);
        partWrap.appendChild(partRow);
        col.appendChild(partWrap);
        const btnContainer = document.createElement('div');
        btnContainer.className = 'quicksort-recurse-actions quicksort-split-buttons';
        const lc = (branch.left || []).length, rc = (branch.right || []).length, st = (branch.stack || []).length;
        if (lc >= 2) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'btn preset-btn quicksort-recurse-btn';
            btn.textContent = dict['quick.recurseLeft'] || '◀ 對左半部繼續分治';
            btn.addEventListener('click', () => {
                branch.history.push({ left: [...branch.left], pivot: branch.pivot, right: [...branch.right], depth: branch.path.length, branch: 'left' });
                branch.path.push('L');
                branch.stack.push([...(branch.right || [])]);
                branch.unpartitioned = [...(branch.left || [])];
                branch.left = []; branch.pivot = null; branch.right = [];
                renderCards();
                setStatus(dict['status.quickPickLeftRight'] || '請將未分區的牌點選後，點擊「＜ pivot」或「＞ pivot」區域放入', 'info');
            });
            btnContainer.appendChild(btn);
        }
        if (rc >= 2) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'btn preset-btn quicksort-recurse-btn';
            btn.textContent = dict['quick.recurseRight'] || '對右半部繼續分治 ▶';
            btn.addEventListener('click', () => {
                branch.history.push({ left: [...branch.left], pivot: branch.pivot, right: [...branch.right], depth: branch.path.length, branch: 'right' });
                branch.path.push('R');
                branch.unpartitioned = [...(branch.right || [])];
                branch.left = []; branch.pivot = null; branch.right = [];
                renderCards();
                setStatus(dict['status.quickPickLeftRight'] || '請將未分區的牌點選後，點擊「＜ pivot」或「＞ pivot」區域放入', 'info');
            });
            btnContainer.appendChild(btn);
        }
        if (lc <= 1 && rc <= 1) {
            if (st > 0) {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'btn preset-btn quicksort-recurse-btn';
                btn.textContent = dict['quick.nextGroup'] || '取下一組繼續';
                btn.addEventListener('click', () => {
                    appendBranchSegment(branch);
                    branch.path.pop();
                    branch.path.push('R');
                    branch.unpartitioned = branch.stack.pop();
                    branch.left = []; branch.pivot = null; branch.right = [];
                    renderCards();
                    setStatus(dict['status.quickPickLeftRight'] || '請將未分區的牌點選後，點擊「＜ pivot」或「＞ pivot」區域放入', 'info');
                });
                btnContainer.appendChild(btn);
            } else {
                if (!branch.doneAppended) {
                    appendBranchSegment(branch);
                    branch.doneAppended = true;
                }
                const span = document.createElement('span');
                span.className = 'quicksort-col-done';
                span.textContent = dict['quick.colDone'] || '✓ 本欄已完成';
                btnContainer.appendChild(span);

                // 在欄位下方顯示此分治區塊「局部排序結果」
                if ((branch.resultOrder || []).length > 0) {
                    const localWrap = document.createElement('div');
                    localWrap.className = 'quicksort-final-order quicksort-final-order-local';
                    const localLabel = document.createElement('div');
                    localLabel.className = 'quicksort-final-order-label';
                    localLabel.textContent = dict['quick.localFinalLabel'] || '本區塊排序結果：';
                    localWrap.appendChild(localLabel);
                    const cardsRow = document.createElement('div');
                    cardsRow.className = 'quicksort-final-order-cards';
                    branch.resultOrder.forEach((card, idx) => {
                        const el = createCardElement(card, idx, 'quick-final', true);
                        el.classList.add('card-final-correct');
                        const orderLabel = document.createElement('div');
                        orderLabel.className = 'card-order-label';
                        orderLabel.textContent = String(idx + 1);
                        el.appendChild(orderLabel);
                        cardsRow.appendChild(el);
                    });
                    localWrap.appendChild(cardsRow);
                    col.appendChild(localWrap);
                }
            }
        }
        col.appendChild(btnContainer);
        row.appendChild(col);
    });
    elements.quicksortSplitContainer.appendChild(row);
}

// 快速切換排序法：套用對應空間模式與指引
function applyPreset(presetId) {
    const dict = i18n[currentLang] || i18n['zh-TW'];
    const config = {
        selection: { spaceMode: 'extraspace', guideKey: 'preset.guideSelection' },
        insertion: { spaceMode: 'extraspace', guideKey: 'preset.guideInsertion' },
        bubble: { spaceMode: 'inplace', guideKey: 'preset.guideBubble' },
        quick: { spaceMode: 'quicksort', guideKey: 'preset.guideQuick' }
    };
    const c = config[presetId];
    if (!c) return;

    gameState.spaceMode = c.spaceMode;
    gameState.preset = presetId;
    if (elements.spaceMode && c.spaceMode !== 'quicksort') elements.spaceMode.value = c.spaceMode;
    switchSpaceModeUI(c.spaceMode);

    const guideText = dict[c.guideKey] || i18n['zh-TW'][c.guideKey] || '';
    if (elements.instructionHint) {
        const hintP = elements.instructionHint.querySelector('p');
        if (hintP) hintP.innerHTML = guideText;
        elements.instructionHint.style.display = '';
    }

    document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('preset-btn-active'));
    const activeBtn = document.querySelector(`.preset-btn[data-preset="${presetId}"]`);
    if (activeBtn) activeBtn.classList.add('preset-btn-active');

    if (gameState.isGameActive && gameState.cards.length > 0) shuffleAndDeal();
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

// 切換空間模式 UI（單一區 / 額外空間 / 快速排序）
function switchSpaceModeUI(mode) {
    const isExtraspace = mode === 'extraspace';
    const isQuicksort = mode === 'quicksort';
    const showInplace = !isExtraspace && !isQuicksort;
    if (elements.cardAreaInplace) {
        elements.cardAreaInplace.style.display = showInplace ? 'block' : 'none';
        elements.cardAreaInplace.setAttribute('aria-hidden', showInplace ? 'false' : 'true');
    }
    if (elements.cardZonesExtraspace) {
        elements.cardZonesExtraspace.style.display = isExtraspace ? 'block' : 'none';
        elements.cardZonesExtraspace.setAttribute('aria-hidden', isExtraspace ? 'false' : 'true');
    }
    if (elements.cardZonesQuickspace) {
        elements.cardZonesQuickspace.style.display = isQuicksort ? 'block' : 'none';
        elements.cardZonesQuickspace.setAttribute('aria-hidden', isQuicksort ? 'false' : 'true');
    }
    const hintP = elements.instructionHint ? elements.instructionHint.querySelector('p') : null;
    if (hintP) {
        const dict = i18n[currentLang] || i18n['zh-TW'];
        const key = isQuicksort ? 'preset.guideQuick' : (isExtraspace ? 'banner.hintExtraspace' : 'banner.hint');
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
    } else if (gameState.spaceMode === 'quicksort') {
        gameState.quickUnpartitioned = [...gameState.cards];
        gameState.quickLeft = [];
        gameState.quickPivot = null;
        gameState.quickRight = [];
        gameState.selectedQuickIndex = -1;
        gameState.quickStack = [];
        gameState.quickPartitionHistory = [];
        gameState.quickPath = [];
        gameState.quickResultOrder = [];
        gameState.quickSplitMode = false;
        gameState.quickLeftBranch = null;
        gameState.quickRightBranch = null;
        clearQuickRecurseButtons();
    } else {
        gameState.currentOrder = [...gameState.cards];
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
    } else if (gameState.spaceMode === 'quicksort') {
        const dict = i18n[currentLang] || i18n['zh-TW'];
        if (elements.quicksortPartitionHistory) {
            elements.quicksortPartitionHistory.innerHTML = '';
            const tipEl = document.createElement('div');
            tipEl.className = 'quicksort-essence-tip';
            tipEl.setAttribute('aria-label', dict['quick.essenceTip'] || '');
            tipEl.textContent = dict['quick.essenceTip'] || '分區（選 pivot）→ 左半部遞迴 → 右半部遞迴 → 合併即有序';
            elements.quicksortPartitionHistory.appendChild(tipEl);
            const pathEl = document.createElement('div');
            pathEl.className = 'quicksort-current-path';
            pathEl.setAttribute('aria-live', 'polite');
            const pathLabel = dict['quick.currentPath'] || '目前位置：';
            const path = (gameState.quickPath || []).length === 0
                ? (dict['quick.pathRoot'] || '根')
                : (gameState.quickPath || []).map(c => c === 'L' ? (dict['quick.branchLeft'] || '左') : (dict['quick.branchRight'] || '右')).join(' → ');
            pathEl.textContent = pathLabel + path;
            elements.quicksortPartitionHistory.appendChild(pathEl);
            gameState.quickPartitionHistory.forEach((item, levelIndex) => {
                const row = document.createElement('div');
                row.className = 'quicksort-partition-row quicksort-history-row quicksort-tree-row';
                const depth = item.depth != null ? item.depth : 0;
                const branch = item.branch;
                row.style.marginLeft = `${depth * 20}px`;
                row.setAttribute('data-depth', depth);
                if (branch) {
                    row.setAttribute('data-branch', branch);
                    const branchLabel = document.createElement('span');
                    if (branch === 'split') {
                        branchLabel.className = 'quicksort-tree-branch quicksort-branch-split';
                        branchLabel.textContent = dict['quick.branchSplit'] || '切開';
                    } else {
                        branchLabel.className = 'quicksort-tree-branch ' + (branch === 'left' ? 'quicksort-branch-left' : 'quicksort-branch-right');
                        branchLabel.textContent = branch === 'left' ? (dict['quick.branchLeft'] || '左') : (dict['quick.branchRight'] || '右');
                    }
                    row.appendChild(branchLabel);
                } else {
                    const branchLabel = document.createElement('span');
                    branchLabel.className = 'quicksort-tree-branch quicksort-branch-root';
                    branchLabel.textContent = dict['quick.pathRoot'] || '根';
                    row.appendChild(branchLabel);
                }
                const content = document.createElement('div');
                content.className = 'quicksort-history-row-content';
                const leftDiv = document.createElement('div');
                leftDiv.className = 'zone-block zone-block-quick quicksort-history-block';
                leftDiv.innerHTML = '<div class="zone-label zone-quick-left">＜ pivot</div><div class="card-area card-area-quick-left"></div>';
                const leftArea = leftDiv.querySelector('.card-area');
                (item.left || []).forEach((card, i) => leftArea.appendChild(createCardElement(card, i, 'quick-left', true)));
                const pivotDiv = document.createElement('div');
                pivotDiv.className = 'zone-block zone-block-pivot quicksort-history-block';
                pivotDiv.innerHTML = '<div class="zone-label zone-quick-pivot">pivot</div><div class="card-area card-area-quick-pivot"></div>';
                const pivotArea = pivotDiv.querySelector('.card-area');
                if (item.pivot) pivotArea.appendChild(createCardElement(item.pivot, 0, 'quick-pivot', true));
                const rightDiv = document.createElement('div');
                rightDiv.className = 'zone-block zone-block-quick quicksort-history-block';
                rightDiv.innerHTML = '<div class="zone-label zone-quick-right">＞ pivot</div><div class="card-area card-area-quick-right"></div>';
                const rightArea = rightDiv.querySelector('.card-area');
                (item.right || []).forEach((card, i) => rightArea.appendChild(createCardElement(card, i, 'quick-right', true)));
                content.appendChild(leftDiv);
                content.appendChild(pivotDiv);
                content.appendChild(rightDiv);
                row.appendChild(content);
                elements.quicksortPartitionHistory.appendChild(row);
            });
        }
        if (gameState.quickSplitMode && elements.quicksortSingleView && elements.quicksortSplitContainer) {
            elements.quicksortSingleView.style.display = 'none';
            elements.quicksortSplitContainer.style.display = 'flex';
            elements.quicksortSplitContainer.innerHTML = '';
            renderQuickSplitView();
        } else {
            if (elements.quicksortSingleView) elements.quicksortSingleView.style.display = '';
            if (elements.quicksortSplitContainer) {
                elements.quicksortSplitContainer.style.display = 'none';
                elements.quicksortSplitContainer.innerHTML = '';
            }
        if (elements.cardAreaQuickUnpartitioned) {
            elements.cardAreaQuickUnpartitioned.innerHTML = '';
            gameState.quickUnpartitioned.forEach((card, index) => {
                const cardEl = createCardElement(card, index, 'quick-unpartitioned');
                if (index === gameState.selectedQuickIndex) cardEl.classList.add('selected');
                elements.cardAreaQuickUnpartitioned.appendChild(cardEl);
            });
        }
        if (elements.cardAreaQuickLeft) {
            elements.cardAreaQuickLeft.innerHTML = '';
            gameState.quickLeft.forEach((card, index) => {
                const cardEl = createCardElement(card, index, 'quick-left', true);
                elements.cardAreaQuickLeft.appendChild(cardEl);
            });
        }
        if (elements.cardAreaQuickPivot) {
            elements.cardAreaQuickPivot.innerHTML = '';
            if (gameState.quickPivot) {
                const cardEl = createCardElement(gameState.quickPivot, 0, 'quick-pivot', true);
                elements.cardAreaQuickPivot.appendChild(cardEl);
            }
        }
        if (elements.cardAreaQuickRight) {
            elements.cardAreaQuickRight.innerHTML = '';
            gameState.quickRight.forEach((card, index) => {
                const cardEl = createCardElement(card, index, 'quick-right', true);
                elements.cardAreaQuickRight.appendChild(cardEl);
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

// 創建卡片DOM（zone, noClick 為 true 時不綁定點擊，用於快速排序左/右/pivot 僅顯示）
function createCardElement(card, index, zone, noClick) {
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

    if (!noClick) cardEl.addEventListener('click', () => onCardClick(zone, index));

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

// 卡片點擊事件（zone, index）
function onCardClick(zone, index) {
    if (!gameState.isGameActive) return;

    if (gameState.spaceMode === 'quicksort') {
        const dict = i18n[currentLang] || i18n['zh-TW'];
        if (zone === 'quick-split-left-unpartitioned' || zone === 'quick-split-right-unpartitioned') {
            const branchId = zone === 'quick-split-left-unpartitioned' ? 'left' : 'right';
            const branch = getBranch(branchId);
            if (!branch || index < 0 || index >= (branch.unpartitioned || []).length) return;
            if (!branch.pivot) {
                branch.pivot = branch.unpartitioned.splice(index, 1)[0];
                gameState.comparisons++;
                gameState.swaps++;
                updateStats();
                setStatus(dict['status.quickPickLeftRight'] || '請將未分區的牌點選後，點擊「＜ pivot」或「＞ pivot」區域放入', 'info');
            } else {
                if (branch.selectedIndex === index) {
                    branch.selectedIndex = -1;
                    setStatus(dict['status.cancelInsert'] || '已取消選擇', 'info');
                } else {
                    branch.selectedIndex = index;
                    const card = branch.unpartitioned[index];
                    setStatus((dict['status.quickSelectCard'] || '已選「{card}」，請點擊左側或右側區域放入').replace('{card}', `${card.rank}${card.suit}`), 'info');
                }
            }
            renderCards();
            return;
        }
        if (zone !== 'quick-unpartitioned') return;
        if (index < 0 || index >= gameState.quickUnpartitioned.length) return;
        if (!gameState.quickPivot) {
            gameState.quickPivot = gameState.quickUnpartitioned.splice(index, 1)[0];
            gameState.comparisons++;
            gameState.swaps++;
            updateStats();
            setStatus(dict['status.quickPickLeftRight'] || '請將未分區的牌點選後，點擊「＜ pivot」或「＞ pivot」區域放入', 'info');
        } else {
            if (gameState.selectedQuickIndex === index) {
                gameState.selectedQuickIndex = -1;
                setStatus(dict['status.cancelInsert'] || '已取消選擇', 'info');
            } else {
                gameState.selectedQuickIndex = index;
                const card = gameState.quickUnpartitioned[index];
                setStatus((dict['status.quickSelectCard'] || '已選「{card}」，請點擊左側或右側區域放入').replace('{card}', `${card.rank}${card.suit}`), 'info');
            }
        }
        renderCards();
        setTimeout(() => { if (gameState.spaceMode === 'quicksort') checkQuickPartitionDone(); }, 0);
        return;
    }

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

    if (gameState.spaceMode === 'quicksort') {
        const dict = i18n[currentLang] || i18n['zh-TW'];
        if (gameState.quickUnpartitioned.length > 0 || !gameState.quickPivot) {
            updateProgress();
            return;
        }
        const pivot = gameState.quickPivot;
        let ok = true;
        for (const c of gameState.quickLeft) { if (compareCards(c, pivot) >= 0) { ok = false; break; } }
        if (ok) for (const c of gameState.quickRight) { if (compareCards(c, pivot) <= 0) { ok = false; break; } }
        if (ok) {
            const tmpl = dict['status.quickPartitionDone'] || i18n['zh-TW']['status.quickPartitionDone'];
            setStatus(tmpl.replace('{comparisons}', String(gameState.comparisons)).replace('{swaps}', String(gameState.swaps)), 'success');
            showQuickRecurseButtons();
        } else {
            clearQuickRecurseButtons();
        }
        updateProgress();
        return;
    }

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
    const total = gameState.cardCount;
    if (gameState.spaceMode === 'quicksort') {
        if (gameState.quickUnpartitioned.length > 0 || !gameState.quickPivot) {
            elements.progressDisplay.textContent = '0%';
            return;
        }
        const pivot = gameState.quickPivot;
        let ok = true;
        for (const c of gameState.quickLeft) { if (compareCards(c, pivot) >= 0) { ok = false; break; } }
        if (ok) for (const c of gameState.quickRight) { if (compareCards(c, pivot) <= 0) { ok = false; break; } }
        elements.progressDisplay.textContent = ok ? '100%' : '0%';
        return;
    }
    const expectedOrder = getExpectedOrder(gameState.currentSortMethod, gameState.cards);
    let correctCount = 0;
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
        container.querySelectorAll('.card').forEach(cardEl => {
            cardEl.classList.remove('card-correct');
            const orderLabel = cardEl.querySelector('.card-order-label');
            if (orderLabel) orderLabel.remove();
        });
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
                if (cardEl) {
                    cardEl.classList.add('card-correct');
                    let orderLabel = cardEl.querySelector('.card-order-label');
                    if (!orderLabel) {
                        orderLabel = document.createElement('div');
                        orderLabel.className = 'card-order-label';
                        orderLabel.textContent = String(i + 1);
                        cardEl.appendChild(orderLabel);
                    }
                }
            }
        }
    } else {
        for (let i = 0; i < gameState.currentOrder.length; i++) {
            if (cardsMatchAtPosition(gameState.currentOrder[i], expectedOrder[i])) {
                const cardEl = document.getElementById(`card-${i}`);
                if (cardEl) {
                    cardEl.classList.add('card-correct');
                    let orderLabel = cardEl.querySelector('.card-order-label');
                    if (!orderLabel) {
                        orderLabel = document.createElement('div');
                        orderLabel.className = 'card-order-label';
                        orderLabel.textContent = String(i + 1);
                        cardEl.appendChild(orderLabel);
                    }
                }
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

// 兩張牌依目前排序規則比較：回傳 -1 (a 在前), 0 (同), 1 (a 在後)
function compareCards(a, b) {
    const method = gameState.currentSortMethod;
    const suitOrder = { '♠': 3, '♥': 2, '♦': 1, '♣': 0 };
    let cmp = 0;
    switch (method) {
        case 'number':
        case 'number-asc':
            if (a.value !== b.value) cmp = a.value - b.value;
            else cmp = suitOrder[a.suit] - suitOrder[b.suit];
            break;
        case 'number-desc':
            if (a.value !== b.value) cmp = b.value - a.value;
            else cmp = suitOrder[a.suit] - suitOrder[b.suit];
            break;
        case 'suit-symbol':
            cmp = suitOrder[a.suit] - suitOrder[b.suit];
            break;
        case 'suit-color':
            cmp = { black: 0, red: 1 }[a.color] - { black: 0, red: 1 }[b.color];
            break;
        default:
            return 0;
    }
    return cmp < 0 ? -1 : cmp > 0 ? 1 : 0;
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
    gameState.selectedQuickIndex = -1;

    if (gameState.spaceMode === 'extraspace') {
        gameState.unsortedOrder = [...gameState.cards];
        gameState.sortedOrder = [];
    } else if (gameState.spaceMode === 'quicksort') {
        gameState.quickUnpartitioned = [...gameState.cards];
        gameState.quickLeft = [];
        gameState.quickPivot = null;
        gameState.quickRight = [];
        gameState.quickStack = [];
        gameState.quickPartitionHistory = [];
        gameState.quickPath = [];
        gameState.quickResultOrder = [];
        gameState.quickSplitMode = false;
        gameState.quickLeftBranch = null;
        gameState.quickRightBranch = null;
        clearQuickRecurseButtons();
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
    if (elements.cardAreaQuickUnpartitioned) elements.cardAreaQuickUnpartitioned.innerHTML = '';
    if (elements.cardAreaQuickLeft) elements.cardAreaQuickLeft.innerHTML = '';
    if (elements.cardAreaQuickPivot) elements.cardAreaQuickPivot.innerHTML = '';
    if (elements.cardAreaQuickRight) elements.cardAreaQuickRight.innerHTML = '';
    gameState.cards = [];
    gameState.currentOrder = [];
    gameState.unsortedOrder = [];
    gameState.sortedOrder = [];
    gameState.quickUnpartitioned = [];
    gameState.quickLeft = [];
    gameState.quickPivot = null;
gameState.quickRight = [];
        gameState.quickStack = [];
        gameState.quickPartitionHistory = [];
        gameState.quickPath = [];
        gameState.quickResultOrder = [];
        gameState.quickSplitMode = false;
        gameState.quickLeftBranch = null;
        gameState.quickRightBranch = null;
        gameState.selectedUnsortedIndex = -1;
    gameState.selectedQuickIndex = -1;
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
