// ISI DARI FILE: ai-assistant/ai-assistant.js

document.addEventListener('DOMContentLoaded', () => {
    const aiBubble = document.getElementById('ai-bubble');
    const aiChatWindow = document.getElementById('ai-chat-window');
    const closeAiChatBtn = document.getElementById('close-ai-chat');
    const aiChatForm = document.getElementById('ai-chat-form');
    const aiChatInput = document.getElementById('ai-chat-input');
    const aiChatMessages = document.getElementById('ai-chat-messages');
    const aiSendBtn = document.getElementById('ai-send-btn');

    const toggleChatWindow = () => {
        aiChatWindow.classList.toggle('hidden');
        if (!aiChatWindow.classList.contains('hidden')) {
            aiChatInput.focus();
        }
    };

    aiBubble.addEventListener('click', toggleChatWindow);
    closeAiChatBtn.addEventListener('click', () => aiChatWindow.classList.add('hidden'));

    aiChatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userMessage = aiChatInput.value.trim();
        if (!userMessage) return;

        addMessage(userMessage, 'user');
        aiChatInput.value = '';
        aiSendBtn.disabled = true;

        setTimeout(() => {
            const aiResponse = getAIResponse(userMessage);
            addMessage(aiResponse, 'ai');
        }, 700);
    });
    
    aiChatInput.addEventListener('input', () => {
        aiSendBtn.disabled = aiChatInput.value.trim() === '';
    });

    function addMessage(text, sender) {
        const messageContainer = document.createElement('div');
        messageContainer.className = `flex mb-3 ${sender === 'user' ? 'justify-end' : 'justify-start'}`;

        const messageBubble = document.createElement('div');
        messageBubble.className = `p-3 rounded-lg max-w-xs shadow-sm ${sender === 'user' ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-800'}`;
        messageBubble.innerHTML = `<p class="text-sm leading-relaxed">${text}</p>`;

        messageContainer.appendChild(messageBubble);
        aiChatMessages.appendChild(messageContainer);

        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    }

    function getAIResponse(question) {
        const q = question.toLowerCase();

        if (q.includes('syarat') && q.includes('nikah')) {
            return 'Untuk persyaratan nikah, Anda bisa melihat informasi lengkapnya di halaman Layanan kami. Secara umum, Anda perlu menyiapkan: <br>- KTP & Kartu Keluarga Calon Pengantin <br>- Akta Kelahiran/Ijazah Terakhir <br>- Pas Foto 2x3 & 3x4 <br>- Surat Pengantar Nikah dari Desa/Kelurahan (N1).';
        } else if (q.includes('biaya') && q.includes('nikah')) {
            return 'Biaya pencatatan nikah di kantor KUA pada jam kerja adalah <strong>GRATIS (Rp 0)</strong>. Jika akad nikah dilaksanakan di luar kantor atau di luar jam kerja, akan dikenakan biaya PNBP sebesar Rp 600.000 yang disetorkan langsung ke bank.';
        } else if (q.includes('alamat') || q.includes('lokasi')) {
            return 'Kantor KUA Malili beralamat di <strong>Jl. Pongsimpin, Upt Malili Sp I, Kec. Malili, Kabupaten Luwu Timur, Sulawesi Selatan, 92936</strong>.';
        } else if (q.includes('jam layanan') || q.includes('jam buka')) {
            return 'Jam layanan kami adalah: <br><strong>Senin - Kamis:</strong> 08.00 - 16.00 WITA <br><strong>Jumat:</strong> 08.00 - 16.30 WITA.';
        } else if (q.includes('kontak') || q.includes('telepon') || q.includes('nomor')) {
            return 'Anda dapat menghubungi kami melalui telepon di nomor <a href="tel:085162747952" class="text-green-700 font-semibold">085162747952</a> atau email di <a href="mailto:kuakotamalili@gmail.com" class="text-green-700 font-semibold">kuakotamalili@gmail.com</a>.';
        } else if (q.includes('terima kasih') || q.includes('makasih')) {
            return 'Sama-sama! Senang bisa membantu. Jika ada pertanyaan lain, jangan ragu untuk bertanya lagi.';
        } else if (q.includes('assalamualaikum')) {
            return 'Waalaikumsalam warahmatullahi wabarakatuh. Ada yang bisa saya bantu?';
        } else {
            return 'Mohon maaf, saya belum mengerti pertanyaan Anda. Anda bisa menanyakan tentang: <ul class="list-disc list-inside mt-2 text-xs"><li>Syarat nikah</li><li>Biaya nikah</li><li>Alamat kantor</li><li>Jam layanan</li><li>Kontak</li></ul>';
        }
    }
});