export function calcularExpectativaGeral(partidas: any[]) {
    const unicosMap = new Map<string, any>();
    const adversarioMap = new Map<string, string>();

    partidas.filter(partida => partida.valida).forEach(p => {
        unicosMap.set(p.casa.time, p.casa);
        unicosMap.set(p.visitante.time, p.visitante);
        adversarioMap.set(p.casa.time, p.visitante.time);
        adversarioMap.set(p.visitante.time, p.casa.time);
    });

    const campos = ['xg_esperado','xg_esperado_mando','xg_esperado_recente','gols_esperados','gols_esperados_mando','gols_esperados_recente'];

    const rankingsOfensivos: Record<string, Array<{time:string,pontos:number}>> = {};
    const rankingsDefensivos: Record<string, Array<{time:string,pontos:number}>> = {};

    campos.forEach(field => {
        const sorted = [...Array.from(unicosMap.values())].sort((a,b) => Number(a.expectativa?.[field] ?? 0) - Number(b.expectativa?.[field] ?? 0));
        rankingsOfensivos[field] = sorted.map((t, i) => ({ time: t.time, pontos: i + 1 }));
        rankingsDefensivos[field] = [...sorted].reverse().map((t, i) => ({ time: adversarioMap.get(t.time) ?? '', pontos: i + 1 }));
    });

    const pontuacoesOfensivasMap = new Map<string, number>();
    const pontuacoesDefensivasMap = new Map<string, number>();

    Object.values(rankingsOfensivos).forEach(lista => lista.forEach(item => pontuacoesOfensivasMap.set(item.time, (pontuacoesOfensivasMap.get(item.time) || 0) + item.pontos)));
    const pontuacoesOfensivas = Array.from(pontuacoesOfensivasMap.entries())
        .map(([time,pontos]) => ({ time, pontos })).sort((a,b) => b.pontos - a.pontos);


    Object.values(rankingsDefensivos).forEach(lista => lista.forEach(item => pontuacoesDefensivasMap.set(item.time, (pontuacoesDefensivasMap.get(item.time) || 0) + item.pontos)));
    const pontuacoesDefensivas = Array.from(pontuacoesDefensivasMap.entries())
        .map(([time,pontos]) => ({ time, pontos })).sort((a,b) => b.pontos - a.pontos);

    const expectativaGeral = {
        ofensiva: pontuacoesOfensivas.slice(0, 5),
        defensiva: pontuacoesDefensivas.slice(0, 5)
    };

    return expectativaGeral;
}