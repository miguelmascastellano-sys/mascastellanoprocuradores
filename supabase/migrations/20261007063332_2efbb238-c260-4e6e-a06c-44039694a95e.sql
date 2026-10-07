update posts set seo_title='Centralizar la procura nacional: guía para abogados' where slug='guia-centralizar-procura-nacional-abogados';
update posts set seo_title='LexNET y sistemas autonómicos: guía para abogados', seo_description='Cómo trabajar con LexNET y los sistemas autonómicos (Avantius, e-Justícia.cat, JustiziaSip y Vereda) cuando su despacho litiga en varias comunidades autónomas.' where slug='que-hacer-cuando-lexnet-no-te-sirve-de-nada-guia-de-supervivencia-multiplataforma-para-abogados';
update posts set seo_title='Cómo elegir procurador en Alicante, Dénia y Gandía', seo_description='Qué debe comprobar un despacho al elegir procurador en Alicante, Dénia y Gandía: colegiación, control de plazos, comunicación y cobertura en otros partidos.' where slug='guia-para-abogados-como-elegir-procurador-en-alicante-denia-y-gandia';

insert into posts (slug,title,excerpt,content_markdown,status,published_at,seo_title,seo_description) values
('procurador-obligatorio-ley-segunda-oportunidad',
'¿Es obligatorio el procurador en la Ley de Segunda Oportunidad?',
'Qué dice el Texto Refundido de la Ley Concursal sobre la representación por procurador en el concurso de persona física y en la exoneración del pasivo insatisfecho.',
$md$La reforma de la Ley 16/2022 amplió y simplificó el acceso de las personas físicas a la exoneración del pasivo insatisfecho. Muchas veces se oye que es un trámite "sencillo", y de ahí surge una duda frecuente entre deudores y despachos: si hace falta procurador. La respuesta del Texto Refundido de la Ley Concursal (TRLC) es clara: sí.

## Qué dice el art. 6.2 TRLC sobre la solicitud

El art. 6.2 TRLC regula la solicitud de concurso. Establece que se presenta por medio de procurador y con la firma de este y de abogado. No es una recomendación: es un requisito de la propia solicitud.

El mismo precepto exige que el procurador disponga de **poder especial para solicitar el concurso**. Un poder general para pleitos no basta. Ese poder especial puede otorgarse:

- Ante notario.
- Apud acta, de forma presencial ante el Letrado de la Administración de Justicia o por vía electrónica.

Conviene preparar el poder antes de presentar la solicitud, porque su falta o insuficiencia es causa de requerimiento de subsanación y retrasa el inicio del procedimiento.

## El concursado actúa siempre con procurador (art. 510 TRLC)

Una vez declarado el concurso, la exigencia continúa. El art. 510 TRLC dispone que «el concursado actuará siempre representado por procurador y asistido de letrado». Esto alcanza a todas las fases: la tramitación del concurso, los incidentes, la solicitud de exoneración y, en su caso, el plan de pagos.

Por tanto, no se trata de una representación limitada a la presentación inicial. El procurador acompaña el procedimiento hasta su terminación.

## Los acreedores también se personan con procurador (art. 512 TRLC)

El art. 512 TRLC regula la personación de los acreedores y demás legitimados. Para comparecer como parte en el concurso y actuar en él (por ejemplo, para oponerse a la exoneración o pedir su revocación) también necesitan representación procesal y defensa técnica.

Para entidades, fondos y servicers esto es especialmente relevante: comunicar el crédito a la administración concursal no equivale a estar personado en el procedimiento.

## Microempresas y autónomos: art. 687.6 TRLC

El procedimiento especial para microempresas se tramita de forma telemática mediante formularios oficiales. Podría pensarse que, por ello, no requiere profesionales. Sin embargo, el art. 687.6 TRLC exige también al deudor la asistencia de abogado y la representación por procurador.

## Reparto de funciones entre procurador y letrado

La intervención de ambos profesionales es complementaria:

**Corresponde al letrado director:**

- Valorar la buena fe del deudor y la viabilidad de la exoneración.
- Elegir la vía (plan de pagos o liquidación de la masa activa).
- Redactar la solicitud, el plan de pagos y los escritos de fondo.
- Asesorar al cliente sobre las deudas que no son exonerables.

**Corresponde al procurador:**

- Presentar la solicitud y los escritos por LexNET ante la Sección de lo Mercantil competente.
- Aportar el poder especial.
- Recibir las resoluciones y dar traslado inmediato al letrado.
- Controlar los plazos procesales en curso.
- Gestionar mandamientos y edictos.
- Seguir el procedimiento hasta el auto de exoneración.

## Qué órgano tramita el concurso en Alicante

Desde la LO 7/2022, los concursos de cualquier persona física corresponden a lo mercantil. Tras la LO 1/2025, en la provincia de Alicante el órgano competente es la Sección de lo Mercantil del Tribunal de Instancia de Alicante, con sede en Alicante y una plaza desplazada en Elche. Los deudores con su centro de intereses principales en Gandía tramitan su concurso en la Sección de lo Mercantil del Tribunal de Instancia de Valencia.

## Conclusión

La exoneración del pasivo insatisfecho exige procurador desde la solicitud (art. 6.2 TRLC) y durante todo el procedimiento (art. 510 TRLC), también en el procedimiento especial para microempresas (art. 687.6 TRLC). Los acreedores que quieran intervenir deben personarse igualmente con procurador (art. 512 TRLC).

Si su despacho tramita un concurso de persona física, puede consultar nuestro servicio de [procurador para la Ley de Segunda Oportunidad](/procurador-ley-segunda-oportunidad) o llamar al 644 206 106.
$md$,
'published', now(),
'Procurador obligatorio en la Ley de Segunda Oportunidad',
'Sí: los arts. 6.2, 510 y 687.6 TRLC exigen procurador en el concurso de persona física. Poder especial, reparto de funciones con el letrado y acreedores.'),
('efectos-concurso-ejecuciones-embargos-acreedores',
'Qué pasa con las ejecuciones y embargos cuando el deudor entra en concurso',
'Efectos de la declaración de concurso sobre las ejecuciones y los embargos en curso según los arts. 142 a 145 TRLC. Guía para acreedores y servicers.',
$md$Cuando un deudor contra el que se sigue una ejecución es declarado en concurso, el acreedor ejecutante debe revisar de inmediato su estrategia. La declaración de concurso afecta a las ejecuciones singulares y a los embargos trabados, y desde ese momento el escenario procesal cambia. Este artículo resume lo que establecen los arts. 142 a 145 del Texto Refundido de la Ley Concursal (TRLC).

## Prohibición de iniciar nuevas ejecuciones (art. 142 TRLC)

Declarado el concurso, no pueden iniciarse ejecuciones judiciales o extrajudiciales ni seguirse apremios administrativos o tributarios contra los bienes y derechos de la masa activa. La regla busca proteger la masa y garantizar el trato igualitario de los acreedores dentro del concurso.

Para el acreedor, la consecuencia práctica es que su vía de cobro pasa a ser, como regla general, el propio procedimiento concursal: comunicación del crédito a la administración concursal y, si quiere actuar, personación en el concurso.

## Suspensión de las ejecuciones en tramitación (art. 143 TRLC)

Las ejecuciones que ya estuvieran en curso en el momento de la declaración quedan suspendidas, con las excepciones que prevé la propia ley. El juzgado que conoce de la ejecución debe acordar la suspensión cuando tenga constancia del concurso, y el procurador del ejecutante recibirá la resolución correspondiente.

En la práctica conviene:

- Comprobar en el Registro Público Concursal y en el BOE si el ejecutado ha sido declarado en concurso.
- Revisar en qué fase se encuentra la ejecución (embargo, avalúo, subasta convocada, adjudicación).
- Coordinar con el letrado la comunicación del crédito y la eventual personación.

## Bienes necesarios y garantías reales (arts. 144 y 145 TRLC)

El TRLC dedica una regulación específica a las ejecuciones de garantías reales sobre bienes de la masa activa. La paralización o suspensión de estas ejecuciones depende, entre otras circunstancias, de si el bien es necesario para la continuidad de la actividad profesional o empresarial del deudor, cuestión que corresponde valorar al juez del concurso.

Las ejecuciones que no afecten a bienes necesarios pueden, en los términos legales, iniciarse o reanudarse, pero con el control del juez del concurso. Por ello, el acreedor hipotecario no debe dar por perdida su ejecución, ni tampoco continuarla sin más: debe obtener el pronunciamiento correspondiente.

## Qué ocurre con los embargos ya trabados

La suspensión de la ejecución no hace desaparecer automáticamente los embargos ya acordados. Su mantenimiento o levantamiento depende de lo que acuerde el juez del concurso, especialmente cuando el levantamiento sea relevante para la continuidad de la actividad del deudor. El letrado del acreedor valorará si procede oponerse o solicitar su mantenimiento.

## La personación del acreedor en el concurso

Comunicar el crédito a la administración concursal no convierte al acreedor en parte del procedimiento. Para intervenir activamente (impugnar el inventario o la lista de acreedores, oponerse a la exoneración del pasivo insatisfecho o pedir su revocación) es necesario personarse conforme al art. 512 TRLC, con procurador y abogado.

Para servicers y fondos que gestionan carteras, conviene establecer un protocolo: detectar a tiempo la declaración de concurso, coordinar la suspensión de la ejecución singular y decidir la personación en el concurso.

## Qué hace el procurador del acreedor

- Recibir y trasladar al letrado la resolución de suspensión de la ejecución.
- Controlar los plazos procesales que se abren con la declaración de concurso.
- Presentar el escrito de personación en el concurso ante la Sección de lo Mercantil competente.
- Seguir los incidentes y, en su caso, la reanudación de la ejecución singular.

## Conclusión

La declaración de concurso impide nuevas ejecuciones y suspende las que estaban en curso (arts. 142 y 143 TRLC), con un régimen especial para las garantías reales (arts. 144 y 145 TRLC). Para proteger su crédito, el acreedor debe reaccionar coordinando la ejecución singular y el concurso.

Más información en nuestras páginas de [procurador para la Ley de Segunda Oportunidad](/procurador-ley-segunda-oportunidad) y de [procurador para ejecuciones judiciales](/procurador-ejecuciones-judiciales), o llame al 644 206 106.
$md$,
'published', now(),
'Ejecuciones y embargos cuando el deudor entra en concurso',
'Efectos del concurso sobre ejecuciones y embargos en curso (arts. 142 a 145 TRLC), garantías reales y personación del acreedor. Guía para servicers.');