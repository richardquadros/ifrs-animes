document.addEventListener('DOMContentLoaded', function() {
  // ======== Elementos do DOM ========
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  const videoPlayer = document.getElementById('video-player');
  const animeVideo = document.getElementById('anime-video');
  const closeVideoBtn = document.getElementById('close-video');
  const menuLinks = document.querySelectorAll('.menu-navegacao a');
  const episodios = document.querySelectorAll('.episodio');
  const barraDePesquisa = document.getElementById('busca');
  const formPesquisa = document.querySelector('.barra-pesquisa');
  const botoesGenero = document.querySelectorAll('.categorias aside button');

  // Elementos do Login
  const loginContainer = document.getElementById('login-container');
  const usernameInput = document.getElementById('input-usuario');
  const passwordInput = document.getElementById('input-senha');
  const loginMessage = document.getElementById('mensagem');
  const loginButton = document.getElementById('btn-entrar');
  const linkConta = document.getElementById('link-conta');
  const nomeUsuarioDisplay = document.getElementById('nome-usuario-display');

  // ======== Função única para ESC ========
  function handleEscapeKey(event) {
    if (event.key === 'Escape' || event.key === 'Esc') {
      // Fecha player de vídeo se aberto
      if (videoPlayer.style.display === 'flex') {
        animeVideo.pause();
        animeVideo.currentTime = 0;
        videoPlayer.style.display = 'none';
        document.body.style.overflow = '';
      }

      // Fecha login se aberto
      if (loginContainer.classList.contains('visible')) {
        loginContainer.classList.remove('visible');
        loginMessage.textContent = '';
        usernameInput.value = '';
        passwordInput.value = '';
      }

      // Fecha menu se aberto
      if (menu.classList.contains('aberto')) {
        menu.classList.remove('aberto');
        document.body.classList.remove('aberto-menu');
      }
    }
  }
  // Ativa listener global só uma vez
  document.addEventListener('keydown', handleEscapeKey);

  // ======== Menu ========
  function toggleMenu() {
    menu.classList.toggle('aberto');
    document.body.classList.toggle('aberto-menu');
  }
  function closeMenu() {
    menu.classList.remove('aberto');
    document.body.classList.remove('aberto-menu');
  }
  if (menuToggle && menu) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMenu();
    });
  }
  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
  document.addEventListener('click', function(event) {
    if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMenu();
    }
  });

  // ======== Vídeo ========
  function playVideo(videoSrc) {
    animeVideo.src = videoSrc;
    videoPlayer.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    animeVideo.play();
  }
  function closeVideoPlayer() {
    if (videoPlayer.style.display === 'flex') {
      animeVideo.pause();
      animeVideo.currentTime = 0;
      videoPlayer.style.display = 'none';
      document.body.style.overflow = '';
    }
  }
  if (closeVideoBtn) {
    closeVideoBtn.addEventListener('click', closeVideoPlayer);
  }

  // ======== Login ========
  function closeLogin() {
    loginContainer.classList.remove('visible');
    loginMessage.textContent = '';
    usernameInput.value = '';
    passwordInput.value = '';
  }
  if (loginContainer && usernameInput && passwordInput && loginMessage && loginButton && linkConta && nomeUsuarioDisplay) {
    linkConta.addEventListener('click', function(event) {
      event.preventDefault();
      const estavaVisivel = loginContainer.classList.contains('visible');
      if (estavaVisivel) {
        closeLogin();
      } else {
        loginContainer.classList.add('visible');
        loginMessage.textContent = '';
        usernameInput.value = '';
        passwordInput.value = '';
        usernameInput.focus();
      }
    });
    loginButton.addEventListener('click', function(event) {
      event.preventDefault();
      const username = usernameInput.value.trim();
      const password = passwordInput.value;
      const USUARIO_CORRETO = "admin";
      const SENHA_CORRETA = "senha123";
      if (username === USUARIO_CORRETO && password === SENHA_CORRETA) {
        loginMessage.textContent = "Login bem-sucedido! Bem-vindo(a)!";
        loginMessage.className = "message success";
        closeLogin();
        nomeUsuarioDisplay.textContent = username;
      } else {
        loginMessage.textContent = "Usuário ou senha incorretos.";
        loginMessage.className = "message error";
      }
    });
  }

  // ======== Episódios ========
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
  window.toggleListaEpisodios = toggleListaEpisodios;

  // ======== Filtros ========
  document.querySelectorAll('.letra-filtro').forEach(botao => {
    botao.addEventListener('click', () => {
      const letraSelecionada = botao.textContent.toLowerCase();
      episodios.forEach(ep => {
        const titulo = ep.querySelector('p').textContent.trim().toLowerCase();
        ep.style.display = (letraSelecionada === 'todos' || titulo.startsWith(letraSelecionada)) ? 'block' : 'none';
      });
    });
  });

  if (formPesquisa && barraDePesquisa) {
    formPesquisa.addEventListener('submit', function(e) {
      e.preventDefault();
      const termo = barraDePesquisa.value.trim().toLowerCase();
      episodios.forEach(ep => {
        const titulo = ep.querySelector('p').textContent.toLowerCase();
        ep.style.display = titulo.includes(termo) ? 'block' : 'none';
      });
    });
  }

  if (botoesGenero && episodios) {
    botoesGenero.forEach(botao => {
      botao.addEventListener('click', () => {
        const generoSelecionado = botao.textContent.trim().toLowerCase();
        episodios.forEach(ep => {
          const generosDoEpisodio = ep.getAttribute('data-genero').toLowerCase();
          ep.style.display = generosDoEpisodio.includes(generoSelecionado) ? 'block' : 'none';
        });
      });
    });
  }

  // ======== Expondo função do vídeo ========
  window.playVideo = playVideo;
});
