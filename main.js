let retangulosCG = [];
let area_totalCG = 0;
let local_centro_gravidadeX_CG = 0;
let local_centro_gravidadeY_CG = 0;
let momento_inerciaX_CG = 0;
let momento_inerciaY_CG = 0;

let retangulos_domsCG = []

// Calculos Relacionados A Tensão

function calcular_area_secao()
{
    const tensaoInput = document.getElementById("SC_tensao_limite");
    const cargaInput = document.getElementById("SC_carga");
    const areaResult = document.getElementById("SC_area_secao_cabo");

    let tensao = tensaoInput.value;
    let carga = cargaInput.value;
    let resultado = carga/tensao;
    
    if(isNaN(resultado))
    {
        areaResult.textContent = "Numeros Inseridos Inválidos";
    }
    else
    {
        areaResult.textContent = resultado;
    }
    
}

function calcular_diametro_cabo()
{
    const areaInput = document.getElementById("DC_area");
    const diametroResult = document.getElementById("DC_diametro_cabo");
    const pi = 3.141592;

    let area = areaInput.value;
    let resultado = Math.sqrt((area*4)/pi);
    
    if(isNaN(resultado))
    {
        diametroResult.textContent = "Numeros Inseridos Inválidos";
    }
    else
    {
        diametroResult.textContent = resultado;
    }
    
}

function calcular_tensao_admitida()
{
    const tensao_limiteInput = document.getElementById("TA_tensao_limite");
    const segurancaInput = document.getElementById("TA_seguranca");
    const tensao_admitidaResult = document.getElementById("TA_tensao_admitida");

    let tensao_limite = tensao_limiteInput.value;
    let seguranca = segurancaInput.value;
    let resultado = tensao_limite/seguranca;
    
    if(isNaN(resultado))
    {
        tensao_admitidaResult.textContent = "Numeros Inseridos Inválidos";
    }
    else
    {
        tensao_admitidaResult.textContent = resultado;
    }
    
}

function calcular_dimensionamento_completo()
{
    const major_forcaInput = document.getElementById("DCP_coeficiente_major");
    const cargaInput = document.getElementById("DCP_carga");
    const tensao_limiteInput = document.getElementById("DCP_tensao_limite");
    const minor_resistenciaInput = document.getElementById("DCP_coeficiente_minor");
    const areaResult = document.getElementById("DCP_area_resistente");
    

    let major_forca = major_forcaInput.value;
    let carga = cargaInput.value;
    let tensao_limite = tensao_limiteInput.value;
    let minor_resistencia = minor_resistenciaInput.value;
    let resultado = (major_forca * carga)/(tensao_limite/minor_resistencia)
    
    if(isNaN(resultado))
    {
        areaResult.textContent = "Numeros Inseridos Inválidos";
    }
    else
    {
        areaResult.textContent = resultado;
    }
    
}


// Calculos Relacionados a Deformação em Barras Causadas por Força Axial

function calcular_deformacao_barra()
{
    const cargaInput = document.getElementById("DB_carga");
    const comprimentoInput = document.getElementById("DB_comprimento");
    const moduloInput = document.getElementById("DB_modulo");
    const areaInput = document.getElementById("DB_area");
    const deformacaoResult = document.getElementById("DB_deformacao");
    

    let carga = cargaInput.value;
    let comprimento = comprimentoInput.value;
    let modulo = moduloInput.value;
    let area = areaInput.value;
    let resultado = (carga * comprimento)/((modulo * 100) * area)
    
    if(isNaN(resultado))
    {
        deformacaoResult.textContent = "Numeros Inseridos Inválidos";
    }
    else
    {
        deformacaoResult.textContent = resultado + " cm²";
    }
    
}

function calcular_area_barra_circular_vazada()
{
    const diametroInput = document.getElementById("CABC_diametro");
    const espessuraInput = document.getElementById("CABC_espessura");
    const areaResult = document.getElementById("CABC_area");
    const pi = 3.141592;

    let diametro = diametroInput.value;
    let espessura = espessuraInput.value;
    let resultado = (pi * ((diametro ** 2) - ((diametro - (espessura * 2)) ** 2))) / 4;

    // (pi * (diametro ** 2))/4
    
    if(isNaN(resultado))
    {
        areaResult.textContent = "Numeros Inseridos Inválidos";
    }
    else
    {
        areaResult.textContent = resultado + " cm²";
    }
    
}


// Calculos Relacionados a Características Geométricas de Perfis

// determinar as carracteristicas geometricas de um poligono ortagonal por decomposição retangular
function erro_PO_CG(mensagem)
{
    const mensagemErro = document.getElementById("CGPO_erro");
    mensagemErro.textContent = mensagem;
}

function add_retangulo_PO_CG()
{
    const tamanho_xInput = document.getElementById("CGPO_tamanho_x");
    const tamanho_yInput = document.getElementById("CGPO_tamanho_y");
    const coordenada_xInput = document.getElementById("CGPO_coordenada_x");
    const coordenada_yInput = document.getElementById("CGPO_coordenada_y");

    let tamanho_x = tamanho_xInput.value;
    let tamanho_y = tamanho_yInput.value;
    let coordenada_x = coordenada_xInput.value;
    let coordenada_y = coordenada_yInput.value;

    if(tamanho_x <= 0 || isNaN(tamanho_x))
    {
        erro_PO_CG("Dimensões devem ser numeros não negativos nem ser zero");
    }
    else if(tamanho_y <= 0 || isNaN(tamanho_y))
    {
        erro_PO_CG("Dimensões devem ser numeros não negativos nem ser zero");
    }
    else if(coordenada_x < 0 || isNaN(coordenada_x))
    {
        erro_PO_CG("Coordenadas devem ser numeros não negativos");
    }
    else if(coordenada_y < 0 || isNaN(coordenada_y))
    {
        erro_PO_CG("Coordenadas devem ser numeros não negativos");
    }
    else 
    {
        erro_PO_CG("")
        let retangulo = {
            tamanho_x : tamanho_x,
            tamanho_y : tamanho_y,
            coordenada_x : coordenada_x,
            coordenada_y : coordenada_y
        };

        retangulosCG.push(retangulo);
    }
    renderizar_retangulos_PO_CG()
}

function apagar_retangulos_PO_CG()
{
    retangulosCG = [];
    area_totalCG = 0;
    local_centro_gravidadeX_CG = 0;
    local_centro_gravidadeY_CG = 0;
    momento_inerciaX_CG = 0;
    momento_inerciaY_CG = 0;
    renderizar_retangulos_PO_CG()
}

function renderizar_retangulos_PO_CG()
{
    const retangulos_domDIV = document.getElementById("CGPO_retangulos_adicionados");
    for(const retDom of retangulos_domsCG)
    {
        retDom.remove();
    }
    retangulos_domsCG = [];

    for(const retangulo of retangulosCG)
    {
        const retanguloDOM = document.createElement("div");
        retanguloDOM.classList.add('CGPO_retangulo');
        retanguloDOM.innerHTML += "<h4>Retangulo " + (retangulosCG.indexOf(retangulo) + 1) + "</h4>"+
                                    "<p>Tamanho horizontal: " + retangulo.tamanho_x + " cm</p>"+
                                    "<p>Tamanho vertical: " + retangulo.tamanho_y + " cm</p><br>"+
                                    "<p>Coordenada horizontal: " + Number(retangulo.coordenada_x) + " cm</p>"+
                                    "<p>Coordenada vertical: " + Number(retangulo.coordenada_y) + " cm</p><br><br>";

        retangulos_domsCG.push(retanguloDOM);
    }
    
    for(const retDom of retangulos_domsCG)
    {
        retangulos_domDIV.appendChild(retDom);
    }
}

function calcular_area_CG_PO()
{
    const areaResult = document.getElementById("CGPO_area");
    let resultado = 0;
    for(const retangulo of retangulosCG)
    {
        const tamanho_x = retangulo.tamanho_x;
        const tamanho_y = retangulo.tamanho_y;

        resultado = resultado + (tamanho_x * tamanho_y);
    }
    area_totalCG = resultado;
    areaResult.textContent = resultado + " cm²";
}

function calcular_centro_gravidade_CG_PO()
{
    const centro_gravidadeResult = document.getElementById("CGPO_centro_de_gravidade");
    let localX = 0;
    let localY = 0;
    for(const retangulo of retangulosCG)
    {
        const tamanho_x = retangulo.tamanho_x;
        const tamanho_y = retangulo.tamanho_y;
        const area = tamanho_x * tamanho_y;
        
        const centro_x = (tamanho_x / 2) + Number(retangulo.coordenada_x);
        localX = localX + (area * centro_x);
    }
    localX = localX / area_totalCG;

    for(const retangulo of retangulosCG)
    {
        const tamanho_x = retangulo.tamanho_x;
        const tamanho_y = retangulo.tamanho_y;
        const area = tamanho_x * tamanho_y;
        
        const centro_y = (tamanho_y / 2) + Number(retangulo.coordenada_y);
        localY = localY + (area * centro_y);
    }
    localY = localY / area_totalCG;

    local_centro_gravidadeX_CG = localX;
    local_centro_gravidadeY_CG = localY;

    centro_gravidadeResult.textContent = "Local horizontal: " + localX + " cm ; Local vertical: " + localY + " cm"
}

function calcular_momento_inercia_CG_PO()
{
    const momento_inerciaResult = document.getElementById("CGPO_momento_de_inercia");
    let ix = 0;
    let iy = 0;
    for(const retangulo of retangulosCG)
    {
        const tamanho_x = retangulo.tamanho_x;
        const tamanho_y = retangulo.tamanho_y;
        const area = tamanho_x * tamanho_y;

        const centro_y = (tamanho_y / 2) + Number(retangulo.coordenada_y);

        let yg = 0;

        if(centro_y <= local_centro_gravidadeY_CG)
        {
            yg = local_centro_gravidadeY_CG - centro_y;
        }
        else
        {
            yg = centro_y - local_centro_gravidadeY_CG;
        }

        ix = ix + (((tamanho_x * (tamanho_y ** 3)) / 12) + (area * (yg ** 2)));
    }

    for(const retangulo of retangulosCG)
    {
        const tamanho_x = retangulo.tamanho_x;
        const tamanho_y = retangulo.tamanho_y;
        const area = tamanho_x * tamanho_y;

        const centro_x = (tamanho_x / 2) + Number(retangulo.coordenada_x);

        let xg = 0;

        if(centro_x <= local_centro_gravidadeX_CG)
        {
            xg = local_centro_gravidadeX_CG - centro_x;
        }
        else
        {
            xg = centro_x - local_centro_gravidadeX_CG;
        }

        iy = iy + (((tamanho_y * (tamanho_x ** 3)) / 12) + (area * (xg ** 2)));
    }

    momento_inerciaX_CG = ix;
    momento_inerciaY_CG = iy;

    momento_inerciaResult.textContent = "Inercia horizontal: " + ix + " cm4 ; Inercia vertical: " + iy + " cm4";
}

function calcular_raio_giracao_CG_PO()
{
    const raio_giracaoResult = document.getElementById("CGPO_raio_de_giracao");
    let raioX = 0;
    let raioY = 0;

    raioX = Math.sqrt(momento_inerciaX_CG/area_totalCG);
    raioY = Math.sqrt(momento_inerciaY_CG/area_totalCG);

    raio_giracaoResult.textContent = "Raio horizontal: " + raioX + " cm ; Raio vertical: " + raioY + " cm";
}

function calcular_momento_resistente_CG_PO()
{
    const momento_resistente_xResult = document.getElementById("CGPO_momento_resistenteX");
    const momento_resistente_yResult = document.getElementById("CGPO_momento_resistenteY");
    let wxs = 0;
    let wxi = 0;
    let wye = 0;
    let wyd = 0;

    let tamanho_x_total_peca = 0;
    let tamanho_y_total_peca = 0;

    let menorX = Number(retangulosCG[0].coordenada_x);
    let maiorX = 0;
    let menorY = Number(retangulosCG[0].coordenada_y);
    let maiorY = 0;

    for(const retangulo of retangulosCG)
    {
        const coordenada_x = retangulo.coordenada_x;
        if(coordenada_x < menorX)
        {
            menorX = coordenada_x;
        }
    }

    for(const retangulo of retangulosCG)
    {
        const tamanho_x = Number(retangulo.tamanho_x);
        const coordenada_x = Number(retangulo.coordenada_x);
        const ponto_maior_x = coordenada_x + tamanho_x;
        if(ponto_maior_x > maiorX)
        {
            maiorX = ponto_maior_x;
        }
    }

    for(const retangulo of retangulosCG)
    {
        const coordenada_y = retangulo.coordenada_y;
        if(coordenada_y < menorY)
        {
            menorY = coordenada_y;
        }
    }

    for(const retangulo of retangulosCG)
    {
        const tamanho_y = Number(retangulo.tamanho_y);
        const coordenada_y = Number(retangulo.coordenada_y);
        const ponto_maior_y = coordenada_y + tamanho_y;
        if(ponto_maior_y > maiorY)
        {
            maiorY = ponto_maior_y;
        }
    }

    let distancia_superior = maiorY - local_centro_gravidadeY_CG;
    let distancia_inferior = local_centro_gravidadeY_CG - menorY;
    let distancia_esquerda = local_centro_gravidadeX_CG - menorX;
    let distancia_direita = maiorX - local_centro_gravidadeX_CG;


    wxs = (momento_inerciaX_CG / distancia_superior);
    wxi = (momento_inerciaX_CG / distancia_inferior);
    wye = (momento_inerciaY_CG / distancia_esquerda);
    wyd = (momento_inerciaY_CG / distancia_direita);


    momento_resistente_xResult.textContent = "Horizontal superior: " + wxs + " cm³ ; Horizontal inferior: " + wxi + " cm³";
    momento_resistente_yResult.textContent = "Vertical esquerdo: " + wye + " cm³ ; Vertical direito: " + wyd + " cm³";
}

function calcular_all_CG_PO()
{
    if(retangulosCG.length <= 0)
    {
        erro_PO_CG("Nenhum retangulo adicionado");
    }
    else
    {
        erro_PO_CG("");
    }
    calcular_area_CG_PO();
    calcular_centro_gravidade_CG_PO();
    calcular_momento_inercia_CG_PO();
    calcular_raio_giracao_CG_PO();
    calcular_momento_resistente_CG_PO()
}

function calcular_CG_C()
{
    const diametroInput = document.getElementById("CGC_diametro");
    const areaResult = document.getElementById("CGC_area");
    const centro_gravidadeResult = document.getElementById("CGC_centro_de_gravidade");
    const momento_inerciaResult = document.getElementById("CGC_momento_de_inercia");
    const momento_polar_inerciaResult = document.getElementById("CGC_momento_polar_de_inercia");
    const raio_giracaoResult = document.getElementById("CGC_raio_de_giracao");
    const momento_resistenteResult = document.getElementById("CGC_momento_resistente");

    const diametro = diametroInput.value;
    const pi = 3.141592653589793;

    const area = (pi * (diametro ** 2)) / 4;

    if(isNaN(area))
    {
        areaResult.textContent = "Numeros Inseridos Inválidos";
    }
    else
    {
        areaResult.textContent = area + " cm²";
    }

    const centro_gravidade = diametro / 2;

    if(isNaN(centro_gravidade))
    {
        centro_gravidadeResult.textContent = "Numeros Inseridos Inválidos";
    }
    else
    {
        centro_gravidadeResult.textContent = centro_gravidade + " cm";
    }

    const momento_inercia = (pi * (diametro ** 4)) / 64;

    if(isNaN(momento_inercia))
    {
        momento_inerciaResult.textContent = "Numeros Inseridos Inválidos";
    }
    else
    {
        momento_inerciaResult.textContent = momento_inercia + " cm^4";
    }

    const momento_polar_inercia = (pi * (diametro ** 4)) / 32;

    if(isNaN(momento_polar_inercia))
    {
        momento_polar_inerciaResult.textContent = "Numeros Inseridos Inválidos";
    }
    else
    {
        momento_polar_inerciaResult.textContent = momento_polar_inercia + " cm^4";
    }

    const raio_giracao = Math.sqrt(momento_inercia / area);

    if(isNaN(raio_giracao))
    {
        raio_giracaoResult.textContent = "Numeros Inseridos Inválidos";
    }
    else
    {
        raio_giracaoResult.textContent = raio_giracao +" cm";
    }

    const momento_resistente = momento_inercia / centro_gravidade;

    if(isNaN(momento_resistente))
    {
        momento_resistenteResult.textContent = "Numeros Inseridos Inválidos";
    }
    else
    {
        momento_resistenteResult.textContent = momento_resistente + " cm³"; 
    }
}

// determinar as carracteristicas geometricas de um poligono ortagonal por decomposição retangular
function calcular_CG_RV()
{
    const tamanho_xInput = document.getElementById("CGRV_tamanho_x");
    const tamanho_yInput = document.getElementById("CGRV_tamanho_y");
    const espessuraInput = document.getElementById("CGRV_espessura");
    const areaResult = document.getElementById("CGRV_area");
    const centro_gravidadeResult = document.getElementById("CGRV_centro_de_gravidade");
    const momento_inerciaResult = document.getElementById("CGRV_momento_de_inercia");
    const raio_giracaoResult = document.getElementById("CGRV_raio_de_giracao");
    const momento_resistente_xResult = document.getElementById("CGRV_momento_resistenteX");
    const momento_resistente_yResult = document.getElementById("CGRV_momento_resistenteY");

    const tamanho_x = tamanho_xInput.value;
    const tamanho_y = tamanho_yInput.value;
    const espessura = espessuraInput.value;

    const area = (tamanho_x * tamanho_y) - ((tamanho_x - (espessura * 2)) * (tamanho_y - (espessura * 2)));

    if(isNaN(area))
    {
        areaResult.textContent = "Numeros Inseridos Inválidos";
    }
    else
    {
        areaResult.textContent = area + " cm²";
    }

    const centro_gravidadeX = tamanho_x / 2;
    const centro_gravidadeY = tamanho_y / 2;

    if(isNaN(centro_gravidadeX) || isNaN(centro_gravidadeY))
    {
        centro_gravidadeResult.textContent = "Numeros Inseridos Inválidos";
    }
    else
    {
        centro_gravidadeResult.textContent = "Local horizontal: " + centro_gravidadeX + 
                                        " cm ; Local vertical: " + centro_gravidadeY + " cm";
    }

    const momento_inerciaX = ((tamanho_x * (tamanho_y ** 3)) / 12) - (((tamanho_x - (espessura * 2)) * ((tamanho_y - (espessura * 2)) ** 3)) / 12);
    const momento_inerciaY = ((tamanho_y * (tamanho_x ** 3)) / 12) - (((tamanho_y - (espessura * 2)) * ((tamanho_x - (espessura * 2)) ** 3)) / 12);

    if(isNaN(momento_inerciaX) || isNaN(momento_inerciaY))
    {
        momento_inerciaResult.textContent = "Numeros Inseridos Inválidos";
    }
    else
    {
        momento_inerciaResult.textContent = "Inercia horizontal: " + momento_inerciaX + 
                                        " cm4 ; Inercia vertical: " + momento_inerciaY + " cm^4";
    }

    const raio_giracaoX = Math.sqrt(momento_inerciaX / area);
    const raio_giracaoY = Math.sqrt(momento_inerciaY / area);

    if(isNaN(raio_giracaoX) || isNaN(raio_giracaoY))
    {
        raio_giracaoResult.textContent = "Numeros Inseridos Inválidos";
    }
    else
    {
        raio_giracaoResult.textContent = "Raio horizontal: " + raio_giracaoX + " cm ; Raio vertical: " + raio_giracaoY + " cm";
    }

    const momento_resistenteX = momento_inerciaX / centro_gravidadeY;
    const momento_resistenteY = momento_inerciaY / centro_gravidadeX;

    if(isNaN(momento_resistenteX) || isNaN(momento_resistenteY))
    {
        momento_resistente_xResult.textContent = "Numeros Inseridos Inválidos";
        momento_resistente_yResult.textContent = "";
    }
    else
    {
        momento_resistente_xResult.textContent = "Horizontal superior e inferior: " + momento_resistenteX + " cm³";
        momento_resistente_yResult.textContent = "Vertical esquerdo e direito: " + momento_resistenteY + " cm³";
    }
}

function calcular_CG_CV()
{
    const diametroInput = document.getElementById("CGCV_diametro");
    const espessuraInput = document.getElementById("CGCV_espessura");
    const areaResult = document.getElementById("CGCV_area");
    const centro_gravidadeResult = document.getElementById("CGCV_centro_de_gravidade");
    const momento_inerciaResult = document.getElementById("CGCV_momento_de_inercia");
    const momento_polar_inerciaResult = document.getElementById("CGCV_momento_polar_de_inercia");
    const raio_giracaoResult = document.getElementById("CGCV_raio_de_giracao");
    const momento_resistenteResult = document.getElementById("CGCV_momento_resistente");

    const diametro = diametroInput.value;
    const espessura = espessuraInput.value;
    const pi = 3.141592653589793;

    const area = ((pi * (diametro ** 2)) / 4) - (((pi * (diametro - (espessura * 2)) ** 2)) / 4);

    if(isNaN(area))
    {
        areaResult.textContent = "Numeros Inseridos Inválidos";
    }
    else
    {
        areaResult.textContent = area + " cm²";
    }

    const centro_gravidade = diametro / 2;

    if(isNaN(centro_gravidade))
    {
        centro_gravidadeResult.textContent = "Numeros Inseridos Inválidos";
    }
    else
    {
        centro_gravidadeResult.textContent = centro_gravidade + " cm";
    }

    const momento_inercia = (pi * ((diametro ** 4) - (((diametro - (espessura * 2))) ** 4)) / 64);

    if(isNaN(momento_inercia))
    {
        momento_inerciaResult.textContent = "Numeros Inseridos Inválidos";
    }
    else
    {
        momento_inerciaResult.textContent = momento_inercia + " cm^4";
    }

    const momento_polar_inercia = (pi * ((diametro ** 4) - (((diametro - (espessura * 2))) ** 4)) / 32);

    if(isNaN(momento_polar_inercia))
    {
        momento_polar_inerciaResult.textContent = "Numeros Inseridos Inválidos";
    }
    else
    {
        momento_polar_inerciaResult.textContent = momento_polar_inercia + " cm^4";
    }

    const raio_giracao = Math.sqrt(momento_inercia / area);

    if(isNaN(raio_giracao))
    {
        raio_giracaoResult.textContent = "Numeros Inseridos Inválidos";
    }
    else
    {
        raio_giracaoResult.textContent = raio_giracao +" cm";
    }

    const momento_resistente = momento_inercia / centro_gravidade;

    if(isNaN(momento_resistente))
    {
        momento_resistenteResult.textContent = "Numeros Inseridos Inválidos";
    }
    else
    {
        momento_resistenteResult.textContent = momento_resistente + " cm³"; 
    }
}

function calcular_deformacao_maxima_DFDM()
{
    const cargaInput = document.getElementById("DM_carga");
    const vaoInput = document.getElementById("DM_vao");
    const modulo_deformacaoInput = document.getElementById("DM_modulo_deformacao");
    const momento_inerciaInput = document.getElementById("DM_momento_inercia");
    const deformacao_maxResult = document.getElementById("DM_deformacao_max");
    
    const carga = Number(cargaInput.value) / 100;
    const vao = Number(vaoInput.value) * 100;
    const modulo_deformacao = Number(modulo_deformacaoInput.value) * 100;
    const momento_inercia = Number(momento_inerciaInput.value);

    const resultado = ((5/384) * ((carga * (vao ** 4)) / (modulo_deformacao * momento_inercia)));

    if(isNaN(resultado))
    {
        deformacao_maxResult.textContent = "Numeros Inseridos Inválidos";
    }
    else
    {
        deformacao_maxResult.textContent = resultado + " cm";
    }
}

function calcular_momento_torcorT()
{
    const forcaInput = document.getElementById("TMT_forca");
    const raioInput = document.getElementById("TMT_raio");
    const momento_torcorResult = document.getElementById("TMT_momento_torcor");

    let forca = Number(forcaInput.value);
    let raio = Number(raioInput.value);
    let resultado = forca * raio;
    
    if(isNaN(resultado))
    {
        momento_torcorResult.textContent = "Numeros Inseridos Inválidos";
    }
    else
    {
        momento_torcorResult.textContent = resultado + "kNcm";
    }
    
}

function calcular_tensao_maxima_cisalhamentoT()
{
    const momento_torcorInput = document.getElementById("TTMC_momento_torcor");
    const raioInput = document.getElementById("TTMC_raio");
    const momento_polar_inerciaInput = document.getElementById("TTMC_momento_polar_inercia");
    const tensao_maxima_cisalhamentoResult = document.getElementById("TTMC_tensao_maxima_cisalhamento");

    let momento_torcor = Number(momento_torcorInput.value);
    let raio = Number(raioInput.value);
    let momento_polar_inercia = Number(momento_polar_inerciaInput.value);
    let resultado = ((momento_torcor * raio) / momento_polar_inercia);
    
    if(isNaN(resultado))
    {
        tensao_maxima_cisalhamentoResult.textContent = "Numeros Inseridos Inválidos";
    }
    else
    {
        tensao_maxima_cisalhamentoResult.textContent = resultado + " kN/cm²";
    }
    
}

function calcular_deslocamento_angularT()
{
    const momento_torcorInput = document.getElementById("TDA_momento_torcor");
    const comprimentoInput = document.getElementById("TDA_comprimento");
    const modulo_elasticidadeInput = document.getElementById("TDA_modulo_elasticidade");
    const momento_polar_inerciaInput = document.getElementById("TDA_momento_polar_inercia");
    const deslocamento_angularResult = document.getElementById("TDA_deslocamento_angular");

    const rad = 57.2958

    let momento_torcor = Number(momento_torcorInput.value);
    let comprimento = Number(comprimentoInput.value);
    let modulo_elasticidade = Number(modulo_elasticidadeInput.value) * 100;
    let momento_polar_inercia = Number(momento_polar_inerciaInput.value);
    let resultado = ((momento_torcor * comprimento) / (modulo_elasticidade * momento_polar_inercia)) * rad;
    
    if(isNaN(resultado))
    {
        deslocamento_angularResult.textContent = "Numeros Inseridos Inválidos";
    }
    else
    {
        deslocamento_angularResult.textContent = resultado + "°";
    }
    
}

function calcular_diametro_minimo_secaoT()
{
    const momento_torcorInput = document.getElementById("TDMS_momento_torcor");
    const tensao_maxima_cisalhamentoInput = document.getElementById("TDMS_tensao_maxima_cisalhamento");
    const diametro_minimo_secaoResult = document.getElementById("TDMS_diametro_minimo_secao");

    let momento_torcor = Number(momento_torcorInput.value);
    let tensao_maxima_cisalhamento = Number(tensao_maxima_cisalhamentoInput.value);
    let resultado = (1.72 * Math.cbrt(momento_torcor/tensao_maxima_cisalhamento));
    
    if(isNaN(resultado))
    {
        diametro_minimo_secaoResult.textContent = "Numeros Inseridos Inválidos";
    }
    else
    {
        diametro_minimo_secaoResult.textContent = resultado + " cm";
    }
}