export const changePage = (PageComponent) => {
  const main = document.querySelector('main');
  if (!main) return;

  main.style.transition = 'width 0.4s ease, opacity 0.4s ease';
  main.style.width = '0';
  main.style.opacity = '0';

  setTimeout(() => {
    main.innerHTML = '';
    PageComponent();
    main.style.transition = 'none'; 
    main.style.width = '100%'; 
    main.style.opacity = '0'; 

    setTimeout(() => {
      main.style.transition = 'width 0.4s ease, opacity 0.4s ease';
      main.style.opacity = '1';
    }, 10); 
  }, 400); 
};
