# Projeto: Rastreador de Hábitos

**Descrição:** Aplicação para rastrear hábitos diários. O foco principal deste projeto é exercitar os conceitos fundamentais do React.

## Objetivos e Conceitos Trabalhados
- **Props:** Passagem de propriedades entre componentes para estruturar a interface (ex: passar um hábito de uma lista para o componente de item de hábito).
- **Renderização condicional de listas:** Exibir listas com `.map()` e mostrar mensagens ou estilos diferentes condicionalmente, dependendo do estado do hábito (concluído/não concluído).
- **Manipulação de arrays no estado:** Adicionar novos hábitos, remover hábitos existentes e marcar hábitos como concluídos, usando imutabilidade.
- **Persistência de Dados (localStorage):** Salvar os hábitos no `localStorage` do navegador para que os dados persistam após o recarregamento da página (F5).

## Funcionalidades Esperadas
1. **Adicionar Hábito:** Um formulário/campo de texto onde o usuário possa digitar um novo hábito e adicioná-lo à lista.
2. **Listar Hábitos:** Exibição de todos os hábitos criados, mapeando o array de estado para componentes React.
3. **Marcar como Concluído:** Um botão ou checkbox para alterar o status do hábito (de pendente para concluído), refletindo essa mudança na interface com renderização condicional.
4. **Remover Hábito:** Um botão para excluir o hábito do array.
5. **Persistência:** Toda vez que um hábito for adicionado, editado ou removido, a lista deve ser salva no `localStorage`. Ao inicializar a aplicação, os hábitos devem ser recuperados.

## Rúbrica
- **Básico:** O aplicativo permite adicionar e remover hábitos. Os dados são salvos na memória durante o uso, mas se perdem ao atualizar a página.
- **Intermediário:** Utiliza renderização condicional para alterar o estilo visual de um hábito concluído e separa as lógicas em diferentes componentes usando Props.
- **Avançado:** Implementa adequadamente o `localStorage` com `useEffect`, garantindo que toda vez que a página recarregar, os hábitos continuem salvos e marcados corretamente.
