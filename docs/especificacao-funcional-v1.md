# Especificação Funcional V1

## 1. Objetivo

Desenvolver um aplicativo para registrar, visualizar e analisar medições de luminosidade em áreas de convôo, com pontos organizados em uma malha regular de linhas e colunas.

## 2. Fluxo obrigatório

1. Configuração da malha.
2. Identificação dos pontos do espote.
3. Entrada das medições.
4. Validação.
5. Análise.
6. Apresentação dos resultados.

O espote deve ser identificado **antes** da entrada dos valores de lux.

## 3. Dados de entrada

- Número de linhas.
- Número de colunas.
- Quantidade de pontos.
- Distância uniforme entre pontos.
- Valor em lux de cada ponto.
- Possibilidade de ponto sem medição.

## 4. Espote

O usuário seleciona diretamente na matriz os pontos que pertencem ao espote.

Regra primordial: **todos os pontos identificados como pertencentes ao espote devem ser preenchidos com uma medição válida antes da análise.**

O espote é representado graficamente por um círculo, centralizado transversalmente no convôo e atravessado pelo eixo central tracejado. A representação gráfica é ilustrativa e não representa as dimensões reais da área.

## 5. Exclusão

O aplicativo deverá permitir, em etapa própria, a exclusão de linhas, colunas ou pontos individuais dos cálculos. A exclusão não apaga a medição; apenas retira o elemento da análise.

Pontos do espote são obrigatórios para a análise e, portanto, não devem ser excluídos de modo a contornar a exigência de preenchimento integral do espote.

## 6. Cálculos

### Pontos considerados

Medições válidas e não excluídas.

### Pontos fora

Quantidade de pontos considerados com valor **< 3 lux** somada à quantidade com valor **> 20 lux**.

Os valores 3,00 lux e 20,00 lux estão dentro dos limites.

### Percentual fora

`(pontos fora / pontos considerados) × 100`

### Média geral

`somatório das medições consideradas / quantidade de medições consideradas`

### Média do espote

`somatório das medições dos pontos do espote / quantidade de pontos do espote`

Como todos os pontos do espote devem ser preenchidos, a média do espote só poderá ser calculada após a validação de completude.

### Critério percentual

- Percentual ≤ 15%: OK.
- Percentual > 15%: NÃO CONFORME.

Essa lógica corrige a inconsistência identificada na fórmula da planilha de referência.

### Critério do espote

- Média do espote > média geral: OK.
- Média do espote ≤ média geral: NÃO CONFORME.

Para igualdade, a V1 adota NÃO CONFORME, conforme a lógica original da fórmula, corrigindo apenas a mensagem para contemplar a igualdade.

## 7. Visualização

O convôo será representado por um retângulo esquemático contendo:

- eixo central longitudinal tracejado;
- espote circular centralizado transversalmente;
- ponto central do espote;
- matriz de pontos de medição.

Os pontos terão gradiente visual:

- acima de 6 lux: verde escuro até verde claro;
- de 3 a 6 lux: amarelo esverdeado até amarelo/alaranjado;
- abaixo de 3 lux: laranja até tons próximos do vermelho.

Pontos sem medição não devem receber uma cor que represente um valor inexistente.

## 8. Observação sobre a planilha de referência

A planilha apresenta inconsistências que não serão reproduzidas no aplicativo: o intervalo usado na contagem de pontos fora é menor que o intervalo usado na contagem geral; a comparação com 15% é incompatível com o valor armazenado em formato percentual; e a mensagem do resultado do limite de 15% está logicamente invertida.

A V1 reproduz os critérios pretendidos, corrigindo essas inconsistências.
