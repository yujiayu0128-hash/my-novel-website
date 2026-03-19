// 存储所有小说的信息
let books = [];
let currentSort = 'a-z';  // 当前排序方式

// 页面加载时，读取novels文件夹里的所有小说
window.onload = function() {
    loadBooks();
};

// 加载小说列表
async function loadBooks() {
    const bookList = document.getElementById('bookList');
    
    try {
        // 这里我们用模拟数据，因为纯前端不能直接读取文件夹
        // 在实际部署时，需要后端支持。现在先手动添加你的小说
        
        // 手动输入你的小说列表（改成你实际的文件名）
        const mockBooks = [
            { name: '三体.txt', size: '2.3 MB' },
            { name: '平凡的世界.txt', size: '1.8 MB' },
            { name: '百年孤独.txt', size: '1.5 MB' },
            { name: '活着.txt', size: '1.2 MB' },
            { name: '追风筝的人.txt', size: '1.4 MB' },
            { name: '解忧杂货店.txt', size: '1.1 MB' }
        ];
        
        books = mockBooks;
        document.getElementById('bookCount').textContent = books.length;
        displayBooks(books);
        
    } catch (error) {
        bookList.innerHTML = '<div class="no-results">加载失败，请刷新重试</div>';
    }
}

// 显示小说列表
function displayBooks(booksToShow) {
    const bookList = document.getElementById('bookList');
    
    if (booksToShow.length === 0) {
        bookList.innerHTML = '<div class="no-results">📖 没有找到匹配的小说</div>';
        return;
    }
    
    let html = '';
    booksToShow.forEach(book => {
        // 去掉.txt后缀显示
        const displayName = book.name.replace('.txt', '');
        
        html += `
            <div class="book-item">
                <div class="book-info">
                    <span class="book-icon">📘</span>
                    <div class="book-details">
                        <div class="book-name">${displayName}</div>
                        <div class="book-meta">
                            <span>📄 TXT文件</span>
                            <span>${book.size || '大小未知'}</span>
                        </div>
                    </div>
                </div>
                <div class="book-actions">
                    <button class="action-btn read-btn" onclick="readBook('${book.name}')">阅读</button>
                    <button class="action-btn download-btn" onclick="downloadBook('${book.name}')">下载</button>
                </div>
            </div>
        `;
    });
    
    bookList.innerHTML = html;
}

// 搜索功能
function searchBooks() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    
    if (!searchText) {
        // 如果搜索框为空，显示所有书
        displayBooks(books);
        return;
    }
    
    const filtered = books.filter(book => 
        book.name.toLowerCase().includes(searchText)
    );
    
    displayBooks(filtered);
}

// 排序功能
function sortBooks(type) {
    currentSort = type;
    
    // 更新按钮样式
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // 复制数组并排序
    const sorted = [...books];
    sorted.sort((a, b) => {
        if (type === 'a-z') {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });
    
    displayBooks(sorted);
}

// 阅读功能（跳转到阅读页）
function readBook(fileName) {
    // 把文件名传给阅读页
    window.location.href = `reader.html?file=${encodeURIComponent(fileName)}`;
}

// 下载功能
function downloadBook(fileName) {
    // 创建一个隐藏的a标签触发下载
    const link = document.createElement('a');
    link.href = `novels/${fileName}`;  // 指向novels文件夹里的文件
    link.download = fileName;           // 指定下载文件名
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}