"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PrivacyPolicy() {
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
              Política de Privacidade
            </h1>
          </div>

          <div className="space-y-8 text-slate-700">
            {/* Introdução */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Introdução</h2>
              <p className="mb-4">
                O SafeCycle ("nós", "nosso" ou "aplicativo") está comprometido em proteger 
                a privacidade e segurança dos dados pessoais de nossos usuários. Esta Política 
                de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas 
                informações pessoais.
              </p>
              <p>
                Ao utilizar o SafeCycle, você concorda com a coleta e uso de informações de 
                acordo com esta política.
              </p>
            </section>

            {/* Informações Coletadas */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                2. Informações que Coletamos
              </h2>
              <p className="mb-4">Coletamos os seguintes tipos de informações:</p>
              
              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                2.1 Informações Fornecidas por Você
              </h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Nome, e-mail e senha (para criação de conta)</li>
                <li>Dados do questionário inicial: peso, altura, idade, objetivos físicos</li>
                <li>Histórico de uso de substâncias e condições de saúde</li>
                <li>Registros de aplicações (data, horário, local do corpo, produto, dosagem)</li>
                <li>Efeitos colaterais reportados</li>
                <li>Progresso em desafios diários</li>
                <li>Informações de pagamento (processadas por terceiros seguros)</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                2.2 Informações Coletadas Automaticamente
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Dados de uso do aplicativo (funcionalidades acessadas, tempo de uso)</li>
                <li>Informações do dispositivo (modelo, sistema operacional, versão do app)</li>
                <li>Endereço IP e dados de localização aproximada</li>
                <li>Logs de erros e desempenho do aplicativo</li>
              </ul>
            </section>

            {/* Como Usamos */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                3. Como Usamos Suas Informações
              </h2>
              <p className="mb-4">Utilizamos suas informações para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personalizar sua experiência no aplicativo</li>
                <li>Gerar relatórios e análises de progresso</li>
                <li>Fornecer recomendações de redução de danos personalizadas</li>
                <li>Enviar notificações e lembretes importantes</li>
                <li>Processar pagamentos de assinaturas</li>
                <li>Melhorar funcionalidades e desenvolver novos recursos</li>
                <li>Garantir a segurança e prevenir fraudes</li>
                <li>Cumprir obrigações legais</li>
              </ul>
            </section>

            {/* Compartilhamento */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                4. Compartilhamento de Informações
              </h2>
              <p className="mb-4">
                <strong>O SafeCycle NUNCA vende, aluga ou compartilha suas informações pessoais 
                com terceiros para fins de marketing.</strong>
              </p>
              <p className="mb-4">Podemos compartilhar informações apenas nas seguintes situações:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Prestadores de Serviços:</strong> Com empresas que nos auxiliam 
                  (hospedagem, processamento de pagamentos, análise de dados), sob rígidos 
                  contratos de confidencialidade
                </li>
                <li>
                  <strong>Requisições Legais:</strong> Quando exigido por lei, ordem judicial 
                  ou autoridades governamentais
                </li>
                <li>
                  <strong>Proteção de Direitos:</strong> Para proteger nossos direitos, 
                  propriedade ou segurança, ou de nossos usuários
                </li>
                <li>
                  <strong>Com Seu Consentimento:</strong> Em outras situações, apenas com 
                  sua autorização explícita
                </li>
              </ul>
            </section>

            {/* Segurança */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                5. Segurança dos Dados
              </h2>
              <p className="mb-4">
                Implementamos medidas de segurança técnicas e organizacionais para proteger 
                suas informações:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Criptografia de dados em trânsito (SSL/TLS) e em repouso</li>
                <li>Autenticação segura e proteção de senhas (hash bcrypt)</li>
                <li>Acesso restrito aos dados apenas para pessoal autorizado</li>
                <li>Monitoramento contínuo de segurança e vulnerabilidades</li>
                <li>Backups regulares e planos de recuperação de desastres</li>
                <li>Conformidade com padrões de segurança da indústria</li>
              </ul>
            </section>

            {/* Retenção */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                6. Retenção de Dados
              </h2>
              <p>
                Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir 
                os propósitos descritos nesta política, a menos que um período de retenção 
                mais longo seja exigido ou permitido por lei. Você pode solicitar a exclusão 
                de seus dados a qualquer momento.
              </p>
            </section>

            {/* Direitos */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                7. Seus Direitos
              </h2>
              <p className="mb-4">Você tem os seguintes direitos sobre seus dados pessoais:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Acesso:</strong> Solicitar cópia de suas informações</li>
                <li><strong>Correção:</strong> Corrigir dados incorretos ou incompletos</li>
                <li><strong>Exclusão:</strong> Solicitar exclusão definitiva de seus dados</li>
                <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
                <li><strong>Oposição:</strong> Opor-se ao processamento de seus dados</li>
                <li><strong>Restrição:</strong> Solicitar limitação do processamento</li>
              </ul>
              <p className="mt-4">
                Para exercer qualquer destes direitos, entre em contato conosco através do 
                e-mail: <strong>safecyclesuporte@gmail.com</strong>
              </p>
            </section>

            {/* Menores */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                8. Menores de Idade
              </h2>
              <p>
                O SafeCycle não é destinado a menores de 18 anos. Não coletamos intencionalmente 
                informações de menores. Se você é pai/mãe ou responsável e acredita que seu 
                filho forneceu informações pessoais, entre em contato conosco imediatamente.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                9. Cookies e Tecnologias Similares
              </h2>
              <p>
                Utilizamos cookies e tecnologias similares para melhorar sua experiência, 
                analisar o uso do aplicativo e personalizar conteúdo. Você pode gerenciar 
                preferências de cookies nas configurações do seu dispositivo.
              </p>
            </section>

            {/* Alterações */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                10. Alterações nesta Política
              </h2>
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos 
                você sobre mudanças significativas através do aplicativo ou por e-mail. 
                Recomendamos revisar esta política regularmente.
              </p>
            </section>

            {/* Contato */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">11. Contato</h2>
              <p className="mb-4">
                Para dúvidas, solicitações ou preocupações sobre esta Política de Privacidade:
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

            {/* Aviso Médico */}
            <section className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-amber-900 mb-4">
                ⚠️ Aviso Importante
              </h2>
              <p className="text-amber-800">
                O SafeCycle é uma ferramenta educacional e de monitoramento. 
                <strong> NÃO substitui orientação médica profissional.</strong> Sempre 
                consulte um médico antes de iniciar, modificar ou interromper qualquer 
                tratamento ou uso de substâncias. Em caso de emergência médica, ligue 192 (SAMU).
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
