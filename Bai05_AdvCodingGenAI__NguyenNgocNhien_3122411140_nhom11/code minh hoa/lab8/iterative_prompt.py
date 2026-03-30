from openai import OpenAI


client = OpenAI(api_key="sk-xxxxxx")

def get_refined_output(old_user_code, error_details):
    prompt = f"""
You are fixing Python code.

Code:
{old_user_code}

Error:
{error_details}

Fix the code.
Return only valid Python code.
Do not explain.
"""

    response = client.responses.create(
        model="gpt-4o-mini",
        input=prompt
    )

    return response.output_text.strip()


bad_code = """for i in range(10)
    print(i)"""

error_text = "SyntaxError: expected ':'"

fixed_code = get_refined_output(bad_code, error_text)
print(fixed_code)