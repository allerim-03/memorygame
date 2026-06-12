1. baixei a extensão live server para possibilitar ver as páginas mais bonitin
ela cria um servidor local, e reload automático




#  Jogo da Memória –  (11/06/2026)

##  Funcionalidades implementadas
- **Botão Voltar** no canto superior esquerdo, que retorna para a página anterior. ( sqn não está funcionandooooooo)
- **HUD fixo no topo direito** com:
  -  Contador de movimentos
  - ⌛Cronômetro (inicia na primeira jogada e para na vitória)
  - ⭐ Pontuação (+10 pontos por par correto) q será tranformando em + 50xp 
- **Painel de Melhor Resultado** fixo no canto superior esquerdo:( que novidade, tbm está bugado)
  - 🏆 Guarda recorde de pontuação e tempo usando `localStorage`
  - Atualiza automaticamente quando o jogador bate um novo recorde
- **Mensagem especial do Tuga** quando o jogador conquista um novo recorde.
- **Título “Jogo da Memória” em verde** para dar destaque.
- **Pontuação com estrela em amarelo** e fundo claro para melhor visibilidade.
- **Layout ajustado** para que o painel de ranking não sobreponha as cartas.

---

##  Tecnologias usadas
- **HTML** para estrutura do jogo
- **CSS** para estilização (cores, posicionamento fixo, animações)
- **JavaScript** para lógica:
  - Controle de movimentos
  - Cronômetro
  - Sistema de pontuação
  - Ranking com `localStorage`
  - Eventos de reinício e botão voltar

---

##  Fluxo do jogo
1. Jogador inicia virando uma carta → cronômetro começa.
2. Cada tentativa (acerto ou erro) incrementa o contador de movimentos.
3. Acertos dão +10 pontos.
4. Ao completar todos os pares:
   - Cronômetro para.
   - Mostra mensagem de vitória.
   - Se for recorde, salva no navegador e mostra mensagem especial do Tuga.
5. Botão **Jogar novamente** reinicia cronômetro, movimentos, pontuação e embaralha cartas.
6. Botão **Voltar** retorna para a página anterior.

---

## 📌 Próximos passos sugeridos
- Criar **sons de vitória/erro** para deixar o jogo mais interativo.
- Expandir ranking para mostrar **top 3 resultados** em vez de apenas o melhor.

---

