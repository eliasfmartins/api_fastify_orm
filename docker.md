# docker

## dockerhub
- repositorio e imagens do docker
* docker ps lista os containers rodando

* docker ps -a lista tudao

* docker start name-container/ou id starta o container

npx prisma migrate dev verifica as migrates e aplica no banco de dados
npx prisma studio abre a interface do prisma no navegador

camelCase: Nesse estilo de formatação, a primeira letra da primeira palavra é minúscula e as primeiras letras subsequentes de cada palavra são maiúsculas, sem espaços entre as palavras. É comumente usado em JavaScript e TypeScript para nomes de variáveis, funções e propriedades de objetos. Exemplo: nomeDoUsuario, totalDeItens, calcularSaldo.

PascalCase: Nesse estilo de formatação, todas as palavras começam com letras maiúsculas, sem espaços entre as palavras. É comumente usado em nomes de classes, interfaces e métodos em várias linguagens de programação, incluindo JavaScript/TypeScript, C#, Java, e outras. Exemplo: Usuario, CalcularSaldo, TotalDeItens.

snake_case: Nesse estilo de formatação, as palavras são separadas por underscores (_) e todas as letras são minúsculas. É menos comum em JavaScript/TypeScript, mas é usado em algumas outras linguagens, como Python e Ruby. Exemplo: nome_do_usuario, total_de_itens, calcular_saldo.



As linguagens de programação podem ser classificadas em dois tipos principais com base no método de execução: compiladas e interpretadas. Vou explicar as diferenças entre elas e as vantagens de cada uma:

Linguagem compilada:

Processo de execução: Em uma linguagem compilada, o código-fonte é traduzido integralmente para código de máquina (linguagem de baixo nível) por um compilador antes da execução. O código compilado resultante é executado diretamente pelo sistema operacional.

Exemplos: C, C++, Rust.

Vantagens:

Desempenho: O código compilado geralmente tende a ter melhor desempenho em comparação com o código interpretado, uma vez que já foi traduzido para código de máquina.

Distribuição: O código compilado pode ser distribuído de forma independente, sem a necessidade de incluir o compilador.

Ocultação de código-fonte: Como o código compilado é executado diretamente pela máquina, o código-fonte original pode ser ocultado.

Linguagem interpretada:
Processo de execução: Em uma linguagem interpretada, o código-fonte é executado linha por linha por um interpretador em tempo real, sem a necessidade de uma etapa de compilação antecipada.

Exemplos: Python, JavaScript, Ruby.

Vantagens:

Portabilidade: Como os interpretadores estão disponíveis em várias plataformas, o mesmo código pode ser executado em diferentes sistemas operacionais sem alterações.

Facilidade de desenvolvimento: Geralmente, as linguagens interpretadas têm uma sintaxe mais simples e fornecem feedback imediato durante o desenvolvimento, o que pode acelerar o ciclo de desenvolvimento.

Flexibilidade: As linguagens interpretadas geralmente oferecem mais flexibilidade durante a execução, como introspecção de objetos e execução dinâmica de código.

Em resumo, as linguagens compiladas tendem a oferecer melhor desempenho e são mais eficientes em termos de distribuição devido à tradução completa do código-fonte em código de máquina. Por outro lado, as linguagens interpretadas oferecem maior portabilidade e facilidade de desenvolvimento, permitindo uma iteração mais rápida durante o processo de desenvolvimento de software. A escolha entre os dois tipos de linguagens geralmente depende das necessidades específicas do projeto e das preferências do desenvolvedor