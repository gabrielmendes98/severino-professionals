import carouselFirstDoodle from 'assets/doodles/home1.svg';
import carouselSecondDoodle from 'assets/doodles/home2.svg';
import carouselThirdDoodle from 'assets/doodles/home3.svg';

const carouselItems = [
  {
    doodle: carouselFirstDoodle,
    title: 'Receba ofertas de onde estiver',
    subtitle:
      'Cadastre-se na aplicação Severino e receba chamados de clientes de onde estiver, direto no seu WhatsApp',
  },
  {
    doodle: carouselSecondDoodle,
    title: 'Conecte-se',
    subtitle:
      'Entre em contato diretamente com seus clientes pelo WhatsApp ou ligação',
  },
  {
    doodle: carouselThirdDoodle,
    title: 'Aumente seus ganhos',
    subtitle:
      'Faça parte do Severino para que possa ser encontrado por diversos usuários da aplicação',
  },
];

const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};

export { carouselItems, carouselSettings };
