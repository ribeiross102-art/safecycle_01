"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TermsOfService() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-slate-800">SafeCycle</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">
              Termos de Uso
            </h1>
          </div>

          <div className="space-y-8 text-slate-700">
            {/* Aceitação */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                1. Aceitação dos Termos
              </h2>
              <p className="mb-4">
                Ao acessar e usar o SafeCycle ("Aplicativo", "Serviço", "nós" ou "nosso"), 
                você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você 
                não concordar com qualquer parte destes termos, não deve usar o Aplicativo.
              </p>
              <p>
                Estes termos constituem um acordo legal entre você ("Usuário", "você" ou "seu") 
                e o SafeCycle.
              </p>
            </section>

            {/* Descrição do Serviço */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                2. Descrição do Serviço
              </h2>
              <p className="mb-4">
                O SafeCycle é uma plataforma digital de educação, monitoramento e redução de 
                danos voltada para usuários de esteroides anabolizantes. O Aplicativo oferece:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Questionário inicial para personalização de experiência</li>
                <li>Scanner de produtos anabolizantes com informações educativas</li>
                <li>Calendário de monitoramento de aplicações</li>
                <li>Registro e acompanhamento de efeitos colaterais</li>
                <li>Desafios diários de bem-estar e saúde</li>
                <li>Chat com inteligência artificial para suporte</li>
                <li>Planos de treino personalizados (Plano Premium)</li>
                <li>Análises e estatísticas de uso</li>
              </ul>
            </section>

            {/* Aviso Médico */}
            <section className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-red-900 mb-4">
                ⚠️ 3. AVISO MÉDICO IMPORTANTE
              </h2>
              <div className="space-y-3 text-red-800">
                <p className="font-semibold">
                  O SAFECYCLE NÃO É UM SERVIÇO MÉDICO E NÃO SUBSTITUI ORIENTAÇÃO PROFISSIONAL.
                </p>
                <p>
                  O Aplicativo fornece informações educacionais e ferramentas de monitoramento 
                  com foco em redução de danos. TODAS as informações são apenas para fins 
                  educativos e informativos.
                </p>
                <p>
                  <strong>Você reconhece e concorda que:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>O SafeCycle NÃO prescreve, recomenda ou incentiva o uso de esteroides</li>
                  <li>O SafeCycle NÃO fornece diagnósticos ou tratamentos médicos</li>
                  <li>Você deve SEMPRE consultar um médico antes de usar qualquer substância</li>
                  <li>O uso de esteroides anabolizantes sem prescrição médica é ilegal no Brasil</li>
                  <li>Em caso de emergência médica, você deve ligar 192 (SAMU) imediatamente</li>
                </ul>
              </div>
            </section>

            {/* Elegibilidade */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                4. Elegibilidade
              </h2>
              <p className="mb-4">Para usar o SafeCycle, você deve:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Ter pelo menos 18 anos de idade</li>
                <li>Ter capacidade legal para aceitar estes Termos</li>
                <li>Fornecer informações verdadeiras e precisas</li>
                <li>Manter a confidencialidade de sua conta</li>
                <li>Não usar o Aplicativo para fins ilegais</li>
              </ul>
            </section>

            {/* Conta do Usuário */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                5. Conta do Usuário
              </h2>
              <p className="mb-4">
                Ao criar uma conta, você é responsável por:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Manter a segurança de sua senha</li>
                <li>Todas as atividades realizadas em sua conta</li>
                <li>Notificar-nos imediatamente sobre uso não autorizado</li>
                <li>Fornecer informações precisas e atualizadas</li>
              </ul>
              <p className="mt-4">
                Reservamo-nos o direito de suspender ou encerrar contas que violem estes Termos.
              </p>
            </section>

            {/* Planos e Pagamentos */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                6. Planos e Pagamentos
              </h2>
              
              <h3 className="text-xl font-semibold text-slate-800 mb-3">6.1 Planos Disponíveis</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Plano Básico:</strong> R$ 19,90/mês - Funcionalidades essenciais</li>
                <li><strong>Plano Premium:</strong> R$ 29,90/mês - Inclui treinos personalizados e recursos avançados</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-800 mb-3">6.2 Pagamentos</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Pagamentos são processados mensalmente</li>
                <li>Aceitamos cartão de débito, crédito e PIX</li>
                <li>Renovação automática até cancelamento</li>
                <li>Sem reembolsos para períodos já utilizados</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-800 mb-3">6.3 Cancelamento</h3>
              <p>
                Você pode cancelar sua assinatura a qualquer momento através das configurações 
                do aplicativo. O cancelamento terá efeito ao final do período de cobrança atual.
              </p>
            </section>

            {/* Uso Aceitável */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                7. Uso Aceitável
              </h2>
              <p className="mb-4">Você concorda em NÃO:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Usar o Aplicativo para fins ilegais ou não autorizados</li>
                <li>Violar leis locais, estaduais, nacionais ou internacionais</li>
                <li>Compartilhar sua conta com terceiros</li>
                <li>Tentar acessar áreas restritas do sistema</li>
                <li>Interferir no funcionamento do Aplicativo</li>
                <li>Copiar, modificar ou distribuir conteúdo do Aplicativo</li>
                <li>Usar bots, scripts ou automações não autorizadas</li>
                <li>Fazer engenharia reversa do Aplicativo</li>
              </ul>
            </section>

            {/* Propriedade Intelectual */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                8. Propriedade Intelectual
              </h2>
              <p className="mb-4">
                Todo o conteúdo do SafeCycle, incluindo textos, gráficos, logos, ícones, 
                imagens, áudios, vídeos, software e compilações de dados, é propriedade 
                exclusiva do SafeCycle ou de seus licenciadores.
              </p>
              <p>
                Você recebe uma licença limitada, não exclusiva e não transferível para 
                usar o Aplicativo apenas para fins pessoais e não comerciais.
              </p>
            </section>

            {/* Limitação de Responsabilidade */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                9. Limitação de Responsabilidade
              </h2>
              <p className="mb-4">
                <strong>O SAFECYCLE É FORNECIDO "COMO ESTÁ" E "CONFORME DISPONÍVEL".</strong>
              </p>
              <p className="mb-4">
                Na máxima extensão permitida por lei, o SafeCycle NÃO se responsabiliza por:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Danos diretos, indiretos, incidentais ou consequenciais</li>
                <li>Perda de dados, lucros ou oportunidades de negócio</li>
                <li>Decisões tomadas com base nas informações do Aplicativo</li>
                <li>Efeitos adversos do uso de substâncias</li>
                <li>Interrupções ou erros no serviço</li>
                <li>Ações de terceiros</li>
              </ul>
            </section>

            {/* Indenização */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                10. Indenização
              </h2>
              <p>
                Você concorda em indenizar e isentar o SafeCycle, seus diretores, funcionários 
                e parceiros de quaisquer reivindicações, danos, perdas ou despesas (incluindo 
                honorários advocatícios) decorrentes de:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Seu uso do Aplicativo</li>
                <li>Violação destes Termos</li>
                <li>Violação de direitos de terceiros</li>
                <li>Qualquer conteúdo que você enviar</li>
              </ul>
            </section>

            {/* Modificações */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                11. Modificações do Serviço e Termos
              </h2>
              <p className="mb-4">
                Reservamo-nos o direito de:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Modificar ou descontinuar o Aplicativo a qualquer momento</li>
                <li>Alterar estes Termos mediante notificação prévia</li>
                <li>Alterar preços de planos com aviso de 30 dias</li>
              </ul>
              <p className="mt-4">
                O uso continuado após modificações constitui aceitação dos novos termos.
              </p>
            </section>

            {/* Rescisão */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                12. Rescisão
              </h2>
              <p className="mb-4">
                Podemos suspender ou encerrar seu acesso ao Aplicativo imediatamente, 
                sem aviso prévio, por:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violação destes Termos</li>
                <li>Atividade fraudulenta ou ilegal</li>
                <li>Solicitação de autoridades legais</li>
                <li>Comportamento prejudicial a outros usuários</li>
              </ul>
            </section>

            {/* Lei Aplicável */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                13. Lei Aplicável e Jurisdição
              </h2>
              <p>
                Estes Termos são regidos pelas leis da República Federativa do Brasil. 
                Quaisquer disputas serão resolvidas nos tribunais da comarca de São Paulo, SP, 
                com exclusão de qualquer outro, por mais privilegiado que seja.
              </p>
            </section>

            {/* Disposições Gerais */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                14. Disposições Gerais
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Acordo Integral:</strong> Estes Termos constituem o acordo completo 
                  entre você e o SafeCycle
                </li>
                <li>
                  <strong>Renúncia:</strong> A não aplicação de qualquer disposição não 
                  constitui renúncia
                </li>
                <li>
                  <strong>Divisibilidade:</strong> Se alguma cláusula for inválida, as demais 
                  permanecem em vigor
                </li>
                <li>
                  <strong>Cessão:</strong> Você não pode transferir seus direitos sem nossa 
                  autorização
                </li>
              </ul>
            </section>

            {/* Contato */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">15. Contato</h2>
              <p className="mb-4">
                Para dúvidas sobre estes Termos de Uso:
              </p>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <p className="font-semibold text-slate-800 mb-2">SafeCycle</p>
                <p className="text-slate-700">E-mail: safecyclesuporte@gmail.com</p>
                <p className="text-slate-700">WhatsApp: (11) 96221-4246</p>
                <p className="text-slate-700 mt-2">
                  Horário de atendimento: Segunda a Sexta, 8h às 20h
                </p>
              </div>
            </section>

            {/* Consentimento */}
            <section className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-green-900 mb-4">
                ✓ Consentimento
              </h2>
              <p className="text-green-800">
                Ao usar o SafeCycle, você confirma que leu, compreendeu e concorda em estar 
                vinculado a estes Termos de Uso e à nossa Política de Privacidade.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200">
            <Button
              onClick={handleBack}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
