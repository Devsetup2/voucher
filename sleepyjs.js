document.addEventListener('DOMContentLoaded', function() {
    // Müzik verileri
    const musicData = [
    {
            id: 1,
            title: "Yağmur Sesleri",
            artist: "Doğa Sesleri",
            cover: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            audio: "https://cdn.pixabay.com/audio/2022/08/06/audio_4b514cb18f.mp3",
            category: "doğa"
        },
        {
            id: 2,
            title: "Okyanus Dalgaları",
            artist: "Doğa Sesleri",
            cover: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            audio: "https://cdn.pixabay.com/audio/2021/09/11/audio_d0d61d29a4.mp3",
            category: "doğa"
        },
        {
            id: 3,
            title: "Orman Gecesi",
            artist: "Doğa Sesleri",
            cover: "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            audio: "https://cdn.pixabay.com/audio/2022/05/05/audio_1395e7800f.mp3",
            category: "doğa"
        },
        {
            id: 4,
            title: "Piyano Melodisi",
            artist: "Enstrümantal",
            cover: "https://images.pexels.com/photos/322719/pexels-photo-322719.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            audio: "https://cdn.pixabay.com/audio/2025/04/29/audio_3f078caae7.mp3",
            category: "enstrümantal"
        },
        {
            id: 5,
            title: "Klasik Gitar",
            artist: "Enstrümantal",
            cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            audio: "https://cdn.pixabay.com/audio/2021/11/23/audio_64b2dd1bce.mp3",
            category: "enstrümantal"
        },
        
        {
            id: 6,
            title: "Beyaz Gürültü",
            artist: "Rahatlatıcı Sesler",
            cover: "https://images.pexels.com/photos/31570261/pexels-photo-31570261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            audio: "https://cdn.pixabay.com/audio/2022/07/13/audio_1c353464c6.mp3",
            category: "rahatlatıcı"
        },
        {
            id: 7,
            title: "Rüzgar Sesi",
            artist: "Rahatlatıcı Sesler",
            cover: "https://images.pexels.com/photos/7763/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            audio: "https://cdn.pixabay.com/audio/2024/05/16/audio_36cc1cbf29.mp3",
            category: "rahatlatıcı"
        },
        {
            id: 8,
            title: "Yoga",
            artist: "Ambiyans",
            cover: "https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=600",
            audio: "https://cdn.pixabay.com/audio/2025/03/29/audio_5debfb4cdc.mp3",
            category: "rahatlatıcı"
        },
        {
            id: 9,
            title: "A cozy day",
            artist: "Enstrümantal",
            cover: "https://img.freepik.com/free-vector/have-cozy-day-card-with-animal-coffee_1191-618.jpg?t=st=1748275170~exp=1748278770~hmac=3c24cf2da234bd9cf304c1c2c49813020d05cfee70a06bae5187d07ce2a149d0&w=826",
            audio: "https://cdn.pixabay.com/audio/2022/07/13/audio_035bf6cca3.mp3",
            category: "enstrümantal"
        },
        
        {
            id: 10,
            title: "Ghibli",
            artist: "Rahatlatıcı Sesler",
            cover: "https://media.bantmag.com/wp-content/uploads/k/kiki-1.webp",
            audio: "https://cdn.pixabay.com/audio/2025/05/05/audio_a8f1f145e3.mp3",
            category: "rahatlatıcı"
        },
    ];

    // DOM Elementleri
    const elements = {
        musicTab: document.getElementById('musicTab'),
        alarmTab: document.getElementById('alarmTab'),
        favoritesTab: document.getElementById('favoritesTab'),
        musicSection: document.getElementById('musicSection'),
        alarmSection: document.getElementById('alarmSection'),
        favoritesSection: document.getElementById('favoritesSection'),
        nowPlaying: document.getElementById('nowPlaying'),
        closePlayerBtn: document.getElementById('closePlayerBtn'),
        audioPlayer: document.getElementById('audioPlayer'),
        playPauseBtn: document.getElementById('playPauseBtn'),
        prevBtn: document.getElementById('prevBtn'),
        nextBtn: document.getElementById('nextBtn'),
        progressBar: document.getElementById('progressBar'),
        currentTimeDisplay: document.getElementById('currentTime'),
        durationDisplay: document.getElementById('duration'),
        nowPlayingImg: document.getElementById('nowPlayingImg'),
        nowPlayingTitle: document.getElementById('nowPlayingTitle'),
        nowPlayingArtist: document.getElementById('nowPlayingArtist'),
        favoriteBtn: document.getElementById('favoriteBtn'),
        musicContainer: document.getElementById('musicContainer'),
        favoritesContainer: document.getElementById('favoritesContainer'),
        searchInput: document.getElementById('searchInput'),
        alarmTime: document.getElementById('alarmTime'),
        alarmSound: document.getElementById('alarmSound'),
        setAlarmBtn: document.getElementById('setAlarmBtn'),
        activeAlarms: document.getElementById('activeAlarms')
    };

    // Uygulama durumu
    const state = {
        currentMusic: null,
        isPlaying: false,
        favorites: JSON.parse(localStorage.getItem('favorites')) || [],
        alarms: JSON.parse(localStorage.getItem('alarms')) || []
    };

    // Sekme değiştirme
    function switchTab(tabName) {
        // Tüm sekmeleri gizle
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.add('hidden');
        });
        
        // Tüm sekme butonlarını resetle
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('bg-blue-500', 'text-white');
            btn.classList.add('bg-gray-200');
        });
        
        // Aktif sekme butonunu güncelle
        const activeTabBtn = document.getElementById(`${tabName}Tab`);
        activeTabBtn.classList.add('bg-blue-500', 'text-white');
        activeTabBtn.classList.remove('bg-gray-200');
        
        // Aktif sekme içeriğini göster
        document.getElementById(`${tabName}Section`).classList.remove('hidden');
        
        // Favoriler sekmesindeyse favorileri yükle
        if (tabName === 'favorites') {
            loadFavorites();
        }
    }

    // Müzik yükleme
    function loadMusic() {
        elements.musicContainer.innerHTML = '';
        
        musicData.forEach(music => {
            const isFavorite = state.favorites.includes(music.id);
            const musicCard = document.createElement('div');
            musicCard.className = 'bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-200';
            musicCard.innerHTML = `
                <div class="relative">
                    <img src="${music.cover}" alt="${music.title}" class="w-full h-40 object-cover">
                    <button class="absolute top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full text-white favorite-btn" data-id="${music.id}">
                        <i class="${isFavorite ? 'fas fa-heart text-red-500' : 'far fa-heart'}"></i>
                    </button>
                </div>
                <div class="p-4">
                    <h3 class="font-semibold text-lg">${music.title}</h3>
                    <p class="text-gray-600 text-sm">${music.artist}</p>
                    <div class="mt-3 flex justify-between items-center">
                        <span class="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">${music.category}</span>
                        <button class="play-btn px-3 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition duration-200" data-id="${music.id}">
                            <i class="fas fa-play"></i> Çal
                        </button>
                    </div>
                </div>
            `;
            elements.musicContainer.appendChild(musicCard);
        });
        
        // Dinleyicileri ekle
        addMusicEventListeners();
    }

    // Müzik çal
    function playMusic(musicId) {
        const music = musicData.find(m => m.id === musicId);
        if (!music) return;
        
        state.currentMusic = music;
        elements.audioPlayer.src = music.audio;
        elements.audioPlayer.play();
        
        // Player UI güncelle
        elements.nowPlayingImg.src = music.cover;
        elements.nowPlayingTitle.textContent = music.title;
        elements.nowPlayingArtist.textContent = music.artist;
        elements.favoriteBtn.innerHTML = state.favorites.includes(music.id) 
            ? '<i class="fas fa-heart text-red-500"></i>' 
            : '<i class="far fa-heart"></i>';
        
        elements.nowPlaying.classList.remove('hidden');
        state.isPlaying = true;
        elements.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        
        // Müzik bitince
        elements.audioPlayer.onended = function() {
            playNextMusic();
        };
    }

    // Müzik kontrol fonksiyonları
    function playNextMusic() {
        if (!state.currentMusic) return;
        const currentIndex = musicData.findIndex(m => m.id === state.currentMusic.id);
        const nextIndex = (currentIndex + 1) % musicData.length;
        playMusic(musicData[nextIndex].id);
    }

    function playPreviousMusic() {
        if (!state.currentMusic) return;
        const currentIndex = musicData.findIndex(m => m.id === state.currentMusic.id);
        const prevIndex = (currentIndex - 1 + musicData.length) % musicData.length;
        playMusic(musicData[prevIndex].id);
    }

    // Favori işlemleri
    function toggleFavorite(musicId) {
        const index = state.favorites.indexOf(musicId);
        if (index === -1) {
            state.favorites.push(musicId);
        } else {
            state.favorites.splice(index, 1);
        }
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
        
        // UI güncelle
        if (state.currentMusic && state.currentMusic.id === musicId) {
            elements.favoriteBtn.innerHTML = index === -1 
                ? '<i class="fas fa-heart text-red-500"></i>' 
                : '<i class="far fa-heart"></i>';
        }
    }

    // Favorileri yükle
    function loadFavorites() {
        elements.favoritesContainer.innerHTML = '';
        
        if (state.favorites.length === 0) {
            elements.favoritesContainer.innerHTML = '<div class="text-gray-500 italic">Henüz favori müzik eklemediniz</div>';
            return;
        }
        
        state.favorites.forEach(favId => {
            const music = musicData.find(m => m.id === favId);
            if (!music) return;
            
            const musicCard = document.createElement('div');
            musicCard.className = 'bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-200';
            musicCard.innerHTML = `
                <div class="relative">
                    <img src="${music.cover}" alt="${music.title}" class="w-full h-40 object-cover">
                    <button class="absolute top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full text-white favorite-btn" data-id="${music.id}">
                        <i class="fas fa-heart text-red-500"></i>
                    </button>
                </div>
                <div class="p-4">
                    <h3 class="font-semibold text-lg">${music.title}</h3>
                    <p class="text-gray-600 text-sm">${music.artist}</p>
                    <div class="mt-3 flex justify-between items-center">
                        <span class="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">${music.category}</span>
                        <button class="play-btn px-3 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition duration-200" data-id="${music.id}">
                            <i class="fas fa-play"></i> Çal
                        </button>
                    </div>
                </div>
            `;
            elements.favoritesContainer.appendChild(musicCard);
        });
        
        addMusicEventListeners();
    }

    // Dinleyicileri ekle
    function addMusicEventListeners() {
        // Çal butonları
        document.querySelectorAll('.play-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const musicId = parseInt(this.getAttribute('data-id'));
                playMusic(musicId);
            });
        });
        
        // Favori butonları
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const musicId = parseInt(this.getAttribute('data-id'));
                toggleFavorite(musicId);
                this.querySelector('i').classList.toggle('far');
                this.querySelector('i').classList.toggle('fas');
                this.querySelector('i').classList.toggle('text-red-500');
            });
        });
    }

    // Alarm işlemleri
    function loadAlarmSounds() {
        elements.alarmSound.innerHTML = '';
        musicData.forEach(music => {
            const option = document.createElement('option');
            option.value = music.id;
            option.textContent = `${music.title} - ${music.artist}`;
            elements.alarmSound.appendChild(option);
        });
    }

    function loadAlarms() {
        elements.activeAlarms.innerHTML = '';
        
        if (state.alarms.length === 0) {
            elements.activeAlarms.innerHTML = '<div class="text-gray-500 italic">Henüz alarm kurulmadı</div>';
            return;
        }
        
        state.alarms.forEach((alarm, index) => {
            const music = musicData.find(m => m.id === alarm.musicId);
            if (!music) return;
            
            const alarmElement = document.createElement('div');
            alarmElement.className = 'bg-white p-4 rounded-lg shadow flex justify-between items-center';
            alarmElement.innerHTML = `
                <div>
                    <div class="font-medium">${alarm.time} <span class="text-blue-500 ml-2"><i class="fas fa-bell"></i></span></div>
                    <div class="text-sm text-gray-600">${music.title}</div>
                </div>
                <button class="delete-alarm px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm hover:bg-red-200 transition duration-200" data-index="${index}">
                    <i class="fas fa-trash"></i> Sil
                </button>
            `;
            elements.activeAlarms.appendChild(alarmElement);
        });
        
        // Sil butonları
        document.querySelectorAll('.delete-alarm').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                state.alarms.splice(index, 1);
                localStorage.setItem('alarms', JSON.stringify(state.alarms));
                loadAlarms();
            });
        });
    }

    // Event listeners
    function setupEventListeners() {
        // Sekme butonları
        elements.musicTab.addEventListener('click', () => switchTab('music'));
        elements.alarmTab.addEventListener('click', () => switchTab('alarm'));
        elements.favoritesTab.addEventListener('click', () => switchTab('favorites'));
        
        // Müzik kontrol
        elements.playPauseBtn.addEventListener('click', function() {
            if (elements.audioPlayer.paused) {
                elements.audioPlayer.play();
                state.isPlaying = true;
                this.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                elements.audioPlayer.pause();
                state.isPlaying = false;
                this.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
        
        elements.prevBtn.addEventListener('click', playPreviousMusic);
        elements.nextBtn.addEventListener('click', playNextMusic);
        elements.favoriteBtn.addEventListener('click', function() {
            if (!state.currentMusic) return;
            toggleFavorite(state.currentMusic.id);
            this.innerHTML = state.favorites.includes(state.currentMusic.id) 
                ? '<i class="fas fa-heart text-red-500"></i>' 
                : '<i class="far fa-heart"></i>';
        });
        
        // Player kapatma
        elements.closePlayerBtn.addEventListener('click', function() {
            elements.audioPlayer.pause();
            elements.nowPlaying.classList.add('hidden');
            state.isPlaying = false;
        });
        
        // Progress bar
        elements.audioPlayer.addEventListener('timeupdate', function() {
            const currentTime = elements.audioPlayer.currentTime;
            const duration = elements.audioPlayer.duration;
            
            if (!isNaN(duration)) {
                elements.progressBar.value = (currentTime / duration) * 100;
                
                // Zaman gösterimi
                const currentMinutes = Math.floor(currentTime / 60);
                const currentSeconds = Math.floor(currentTime % 60);
                elements.currentTimeDisplay.textContent = `${currentMinutes}:${String(currentSeconds).padStart(2, '0')}`;
                
                const durationMinutes = Math.floor(duration / 60);
                const durationSeconds = Math.floor(duration % 60);
                elements.durationDisplay.textContent = `${durationMinutes}:${String(durationSeconds).padStart(2, '0')}`;
            }
        });
        
        elements.progressBar.addEventListener('input', function() {
            const seekTime = (elements.audioPlayer.duration / 100) * this.value;
            elements.audioPlayer.currentTime = seekTime;
        });
        
        // Arama
        elements.searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const musicCards = elements.musicContainer.querySelectorAll('.bg-white');
            
            musicCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const artist = card.querySelector('p').textContent.toLowerCase();
                const category = card.querySelector('span').textContent.toLowerCase();
                
                if (title.includes(query) || artist.includes(query) || category.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
        
        // Alarm kurma
        elements.setAlarmBtn.addEventListener('click', function() {
            const time = elements.alarmTime.value;
            const musicId = parseInt(elements.alarmSound.value);
            
            if (!time) {
                alert('Lütfen bir zaman seçin');
                return;
            }
            
            state.alarms.push({ time, musicId });
            localStorage.setItem('alarms', JSON.stringify(state.alarms));
            loadAlarms();
            alert('Alarm başarıyla kuruldu!');
        });
    }

    // Uygulamayı başlat
    function initApp() {
        loadMusic();
        loadAlarmSounds();
        loadAlarms();
        setupEventListeners();
        
        // Alarm kontrolü
        setInterval(() => {
            const now = new Date();
            const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            
            state.alarms.forEach(alarm => {
                if (alarm.time === currentTime) {
                    const music = musicData.find(m => m.id === alarm.musicId);
                    if (music) {
                        playMusic(music.id);
                        alert(`Alarm! ${alarm.time} - ${music.title}`);
                    }
                }
            });
        }, 60000);
    }

    initApp();
});