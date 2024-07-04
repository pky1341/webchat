import Link from "next/link";
import { Html, Head, Font, Container, Section, Heading, Preview, Row, Text, Button } from "@react-email/components";
interface verificationEmailProps {
    otp: string;
    user: string;
}

export const sendVerification = async ({ otp, user }: verificationEmailProps) => {
    return (
        <Html lang="en" dir="ltr">
            <Head>
                <title>
                    WebChat Verification Email
                </title>
            </Head>
            <Font
                fontFamily="Roboto"
                fallbackFontFamily="Verdana"
                webFont={{
                    url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
                    format: "woff2",
                }}
                fontWeight={400}
                fontStyle="normal"
            />
            <Container>
                <Section>
                    <Heading>
                        welcome to webchat
                    </Heading>
                </Section>
                <Section>
                    <Preview>Here&apos;s your verification code: {otp}</Preview>
                </Section>
                <Row>
                    <Heading as="h2">Hello {user},</Heading>
                </Row>
                <Row>
                    <Text>
                        Thank you for registering. Please use the following verification
                        code to complete your registration:
                    </Text>
                </Row>
                <Row>
                    <Text>{otp}</Text>
                </Row>
            </Container>
        </Html>
    );
}