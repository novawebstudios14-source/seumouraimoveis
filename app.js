'use strict';
const $=s=>document.querySelector(s);
const header=$('.header'),menu=$('.menu'),nav=$('#navigation');
if('IntersectionObserver' in window){const headerObserver=new IntersectionObserver(([entry])=>header.classList.toggle('scrolled',!entry.isIntersecting),{rootMargin:'-80px 0px 0px 0px'});headerObserver.observe($('.hero'));}
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menu');}
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
const whatsapp=message=>'https://wa.me/5594992972083?text='+encodeURIComponent(message);
document.querySelectorAll('.whatsapp').forEach(a=>{a.href=whatsapp(a.dataset.message);});
$('#year').textContent=new Date().getFullYear();
$('#owner-form').addEventListener('submit',e=>{e.preventDefault();const name=$('#name').value.trim(),city=$('#city').value.trim();if(!name||!city)return;window.open(whatsapp(`Olá, Seu Moura! Meu nome é ${name}. Quero anunciar um imóvel.\nTipo: ${$('#owner-type').value}\nCidade: ${city}\nPodemos conversar?`),'_blank','noopener,noreferrer');});
function filter(){const purpose=$('#purpose').value,location=$('#location').value,type=$('#type').value;const match=(purpose==='all'||purpose==='venda')&&(location==='all'||location==='ipiranga')&&(type==='all'||type==='casa');$('#property').hidden=!match;$('#empty').hidden=match;$('#result-count').textContent=match?'1 imóvel encontrado':'Nenhum imóvel para estes filtros';$('#clear').hidden=purpose==='all'&&location==='all'&&type==='all';}
$('#search').addEventListener('submit',e=>{e.preventDefault();filter();$('#imoveis').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});
$('#clear').addEventListener('click',()=>{$('#search').reset();filter();});
const dialog=$('#property-dialog');let previousFocus;let currentPhoto=0;
const photos=[['house.webp','Fachada da casa no Condomínio Ipiranga'],['living.webp','Ambiente interno do imóvel'],['interior.webp','Detalhes dos ambientes do imóvel'],['detail.webp','Interior da residência'],['room.webp','Ambiente da casa no Condomínio Ipiranga']];
function showPhoto(index){currentPhoto=(index+photos.length)%photos.length;$('#gallery-image').src='./assets/'+photos[currentPhoto][0];$('#gallery-image').alt=photos[currentPhoto][1];$('#gallery-count').textContent=`${currentPhoto+1} / ${photos.length}`;}
document.querySelectorAll('.open-property').forEach(button=>button.addEventListener('click',()=>{previousFocus=button;showPhoto(0);dialog.showModal();document.body.classList.add('modal-open');}));
$('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const rect=dialog.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');previousFocus?.focus();});
$('#previous').addEventListener('click',()=>showPhoto(currentPhoto-1));$('#next').addEventListener('click',()=>showPhoto(currentPhoto+1));
dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight')showPhoto(currentPhoto+1);if(e.key==='ArrowLeft')showPhoto(currentPhoto-1);});
