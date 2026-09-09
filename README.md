# Análise de Luminosidade — Áreas de Convôo

Aplicativo em desenvolvimento para registro, visualização e análise de medições de luminosidade em áreas de convôo.

## Escopo inicial

- Configuração da malha por linhas, colunas, quantidade de pontos e distância uniforme.
- Identificação do espote antes da entrada das medições.
- Obrigatoriedade de preenchimento de todos os pontos do espote.
- Entrada de valores de luminosidade em lux, com possibilidade de ausência para pontos fora do espote.
- Representação esquemática do convôo, com eixo central e espote circular.
- Gradiente visual dos pontos conforme a luminosidade.
- Cálculos baseados nas fórmulas da planilha de referência, com as inconsistências identificadas corrigidas.

## Critérios da V1

- Ponto fora dos limites: valor < 3 lux ou > 20 lux.
- Limite percentual de pontos fora: 15%.
- Média do espote deve ser superior à média geral.
- Igualdade entre média do espote e média geral: não conforme.

## Status

Protótipo inicial — sujeito a testes e refinamentos antes de ser considerado uma versão segura.
