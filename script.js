document.addEventListener('DOMContentLoaded', function() {
  // ===========================================
  // === 1. Elementos do DOM (Centralizados) ===
  // ===========================================
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  const videoPlayer = document.getElementById('video-player');
  const animeVideo = document.getElementById('anime-video');
  const closeVideoBtn = document.getElementById('close-video');
  const menuLinks = document.querySelectorAll('.menu-navegacao a');
  const episodios = document.querySelectorAll('.episodio'); // Declarado uma vez para todos os filtros
  const barraDePesquisa = document.getElementById('busca');
  const formPesquisa = document.querySelector('.barra-pesquisa');
  const botoesGenero = document.querySelectorAll('.categorias aside button');

  // Elementos do Login (Verificados se existem)
  const loginContainer = document.getElementById('login-container');
  const usernameInput = document.getElementById('input-usuario');
  const passwordInput = document.getElementById('input-senha');
  const loginMessage = document.getElementById('mensagem');
  const loginButton = document.getElementById('btn-entrar');
  const linkConta = document.getElementById('link-conta'); // NOVO: elemento do link "Conta"
  const nomeUsuarioDisplay = document.getElementById('nome-usuario-display'); // NOVO: span para exibir o nome

  // ==========================================
  // === 2. GERENCIAMENTO DO MENU MOBILE ====
  // ==========================================
  function toggleMenu() {
    menu.classList.toggle('aberto');
    document.body.classList.toggle('aberto-menu');
    
    if (menu.classList.contains('aberto')) {
      document.addEventListener('keydown', handleEscapeKey);
    } else {
      document.removeEventListener('keydown', handleEscapeKey);
    }
  }

  function closeMenu() {
    menu.classList.remove('aberto');
    document.body.classList.remove('aberto-menu');
    document.removeEventListener('keydown', handleEscapeKey);
  }

  function handleOutsideClick(event) {
    if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMenu();
    }
  }

  function handleEscapeKey(event) {
    if (event.key === 'Escape') {
      closeMenu();
      closeVideoPlayer(); // Adicionado para fechar o vídeo com ESC, se estiver aberto
    }
  }

  // Event Listeners para o menu
  if (menuToggle && menu) { // Garante que estes elementos existem antes de adicionar listeners
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMenu();
    });
  }

  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', handleOutsideClick);

  // =========================================
  // === 3. GERENCIAMENTO DE EPISÓDIOS =====
  // =========================================
  function toggleListaEpisodios(id) {
    const todas = document.querySelectorAll('.lista-episodios');

    todas.forEach(lista => {
      if (lista.id !== id) {
        lista.classList.remove('aberto');
      }
    });

    const alvo = document.getElementById(id);
    if (alvo) {
      alvo.classList.toggle('aberto');
    }
  }

  // ====================================
  // === 4. PLAYER DE VÍDEO ===========
  // ====================================
  function playVideo(videoSrc) {
    if (animeVideo && videoPlayer) { // Garante que os elementos do vídeo existem
      animeVideo.src = videoSrc;
      videoPlayer.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Impede scroll da página
      animeVideo.play();
      
      document.addEventListener('keydown', handleVideoEscapeKey);
    }
  }

  function closeVideoPlayer() {
    if (animeVideo && videoPlayer) { // Garante que os elementos do vídeo existem
      animeVideo.pause();
      animeVideo.currentTime = 0;
      videoPlayer.style.display = 'none';
      document.body.style.overflow = ''; // Restaura scroll da página
      document.removeEventListener('keydown', handleVideoEscapeKey);
    }
  }

  function handleVideoEscapeKey(event) {
    if (event.key === 'Escape') {
      closeVideoPlayer();
    }
  }

  // Event Listener para o player de vídeo
  if (closeVideoBtn) { // Garante que o botão existe
    closeVideoBtn.addEventListener('click', closeVideoPlayer);
  }

  // ==================================================
  // === 5. EXPORTA FUNÇÕES PARA USO NO HTML (window) ===
  // ==================================================
  window.toggleListaEpisodios = toggleListaEpisodios;
  window.playVideo = playVideo;

  // ==================================
  // === 6. FILTRO POR LETRA ========
  // ==================================
  document.querySelectorAll('.letra-filtro').forEach(botao => {
    botao.addEventListener('click', () => {
      const letraSelecionada = botao.textContent.toLowerCase();
      // 'episodios' já está declarado no início do DOMContentLoaded
      episodios.forEach(ep => {
        const titulo = ep.querySelector('p').textContent.trim().toLowerCase();

        if (letraSelecionada === 'todos' || titulo.startsWith(letraSelecionada)) {
          ep.style.display = 'block';
        } else {
          ep.style.display = 'none';
        }
      });
    });
  });

  // ==================================
  // === 7. BARRA DE PESQUISA =========
  // ==================================
  if (formPesquisa && barraDePesquisa) { // Garante que os elementos existem
    formPesquisa.addEventListener('submit', function(e) {
      e.preventDefault(); // impede o recarregamento da página

      const termo = barraDePesquisa.value.trim().toLowerCase();

      // 'episodios' já está declarado no início do DOMContentLoaded
      episodios.forEach(ep => {
        const titulo = ep.querySelector('p').textContent.toLowerCase();
        if (titulo.includes(termo)) {
          ep.style.display = 'block';
        } else {
          ep.style.display = 'none';
        }
      });
    });
  }

  // ==================================
  // === 8. FILTRO POR GÊNERO =========
  // ==================================
  if (botoesGenero && episodios) { // Garante que os elementos existem
      botoesGenero.forEach(botao => {
        botao.addEventListener('click', () => {
          const generoSelecionado = botao.textContent.trim().toLowerCase();

          // 'episodios' já está declarado no início do DOMContentLoaded
          episodios.forEach(ep => {
            const generosDoEpisodio = ep.getAttribute('data-genero').toLowerCase();

            if (generosDoEpisodio.includes(generoSelecionado)) {
              ep.style.display = 'block';
            } else {
              ep.style.display = 'none';
            }
          });
        });
      });
  }

  // ========================================
  // === 9. LÓGICA DO FORMULÁRIO DE LOGIN ===
  // ========================================
  if (loginContainer && usernameInput && passwordInput && loginMessage && loginButton && linkConta && nomeUsuarioDisplay) {
    
    // Adiciona listener para mostrar/esconder o formulário ao clicar em "Conta"
    linkConta.addEventListener('click', function(event) {
        event.preventDefault(); // Impede o comportamento padrão do link
        loginContainer.classList.toggle('visible'); // Alterna a classe 'visible'
        loginMessage.textContent = ''; // Limpa a mensagem ao abrir/fechar
        usernameInput.value = ''; // Limpa o campo de usuário
        passwordInput.value = ''; // Limpa o campo de senha
    });

    loginButton.addEventListener('click', function(event) {
      event.preventDefault();

      const username = usernameInput.value;
      const password = passwordInput.value;

      // Credenciais fixas para demonstração
      const USUARIO_CORRETO = "admin";
      const SENHA_CORRETA = "senha123";

      if (username === USUARIO_CORRETO && password === SENHA_CORRETA) {
        loginMessage.textContent = "Login bem-sucedido! Bem-vindo(a)!";
        loginMessage.className = "message success"; // Adiciona classe 'success' para estilo verde
        usernameInput.value = '';
        passwordInput.value = '';

        // Esconde o formulário de login após o sucesso
        loginContainer.classList.remove('visible'); 
        
        // Altera o texto do span "Conta" para o nome do usuário
        nomeUsuarioDisplay.textContent = username; 

        // Opcional: Você pode querer adicionar uma classe CSS ao link "Conta"
        // para estilizar o nome do usuário logado de forma diferente
        // linkConta.classList.add('logado');

      } else {
        loginMessage.textContent = "Usuário ou senha incorretos.";
        loginMessage.className = "message error"; // Adiciona classe 'error' para estilo vermelho
      }
    });
  }
});