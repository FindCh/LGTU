// Ожидание загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
    // Лоадер на 3 секунды при перезагрузке или заходе
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.style.position = 'fixed';
    loader.style.top = '0';
    loader.style.left = '0';
    loader.style.width = '100%';
    loader.style.height = '100%';
    loader.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    loader.style.display = 'flex';
    loader.style.justifyContent = 'center';
    loader.style.alignItems = 'center';
    loader.style.zIndex = '9999';
    loader.innerHTML = '<h1>Загрузка...</h1>';
    document.body.appendChild(loader);

    setTimeout(() => {
        loader.remove();
    }, 3000);

    // Динамическое добавление карточек
    const fileData = [
        {
            type: 'pdf',
            title: 'Супер важный PDF-файл с расписанием на 2023 год',
            author: 'Пискунов Михаил',
            date: '13 марта 2023 года'
        },
        {
            type: 'doc',
            title: 'Критерии оценки на экзамене в 2023 году',
            author: 'Пискунов Михаил',
            date: '13 февраля 2023 года'
        },
        {
            type: 'xls',
            title: 'Табличка со списком покупок',
            author: 'Пискунов Михаил',
            date: '13 декабря 2023 года'
        },
        {
            type: 'png',
            title: 'Фотка с отпуска, в который я так хочу вернуться...',
            author: 'Пискунов Михаил',
            date: '8 июня 2023 года'
        }
    ];

    const fileList = document.querySelector('.file-list');

    fileData.forEach(file => {
        const fileItem = document.createElement('article');
        fileItem.className = `file-item ${file.type}`;
        fileItem.setAttribute('aria-label', `${file.type.toUpperCase()} файл`);

        fileItem.innerHTML = `
            <div class="file-icon">${file.type.toUpperCase()}</div>
            <div class="file-info">
                <h3>${file.title}</h3>
                <p>Создал: ${file.author}</p>
                <p>Последнее изменение: ${file.date}</p>
            </div>
        `;

        fileList.appendChild(fileItem);
    });

    // Фильтрация файлов
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Удаляем класс active у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Добавляем active к текущей кнопке
            button.classList.add('active');

            // Получаем тип фильтра
            const filterType = button.textContent.toLowerCase();

            // Показываем или скрываем файлы
            const fileItems = document.querySelectorAll('.file-item');
            fileItems.forEach(item => {
                if (filterType === 'все типы' || item.classList.contains(filterType)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Выпадающее меню сортировки
    const sortDropdown = document.querySelector('.sort-dropdown');
    const sortButton = sortDropdown.querySelector('.sort-btn');
    const sortMenu = sortDropdown.querySelector('.sort-menu');

    let sortMenuTimeout;

    sortButton.addEventListener('click', () => {
        if (sortMenu.classList.contains('visible')) {
            sortMenu.classList.remove('visible');
        } else {
            sortMenu.classList.add('visible');
        }
    });

    sortMenu.addEventListener('mouseenter', () => {
        clearTimeout(sortMenuTimeout);
    });

    sortMenu.addEventListener('mouseleave', () => {
        sortMenuTimeout = setTimeout(() => {
            sortMenu.classList.remove('visible');
        }, 300);
    });

    sortMenu.addEventListener('click', (event) => {
        const sortOption = event.target.textContent;

        // Сортировка по дате
        const fileItems = Array.from(document.querySelectorAll('.file-item'));
        fileItems.sort((a, b) => {
            const dateA = new Date(a.querySelector('p:last-child').textContent.split(': ')[1]);
            const dateB = new Date(b.querySelector('p:last-child').textContent.split(': ')[1]);

            if (sortOption === 'Сначала новые') {
                return dateB - dateA;
            } else if (sortOption === 'Сначала старые') {
                return dateA - dateB;
            } else {
                return 0;
            }
        });

        // Перерисовка списка
        fileList.innerHTML = '';
        fileItems.forEach(item => fileList.appendChild(item));
        sortMenu.classList.remove('visible');
    });
});
